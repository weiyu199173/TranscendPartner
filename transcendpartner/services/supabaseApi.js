import supabase from '../config/supabase';

const handleError = (error) => {
  console.error('Supabase Error:', error);
  return { success: false, error: error.message };
};

const handleResponse = (data, error) => {
  if (error) return handleError(error);
  return { success: true, data };
};

const supabaseApi = {
  auth: {
    login: async (phone, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `${phone}@example.com`,
          password,
        });
        if (error) throw error;
        
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (userError) throw userError;
        
        return {
          success: true,
          data: {
            token: data.session.access_token,
            user: userData,
          },
        };
      } catch (error) {
        return handleError(error);
      }
    },

    register: async (phone, password) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: `${phone}@example.com`,
          password,
          options: {
            data: {
              phone,
              name: '用户',
              avatar: '👤',
            },
          },
        });
        if (error) throw error;
        return {
          success: true,
          data: {
            message: '注册成功',
            user: data.user,
          },
        };
      } catch (error) {
        return handleError(error);
      }
    },

    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
      } catch (error) {
        return handleError(error);
      }
    },

    getCurrentUser: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: 'No user logged in' };
        
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        return { success: true, data: userData };
      } catch (error) {
        return handleError(error);
      }
    },
  },

  plaza: {
    getPosts: async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            users!posts_user_id_fkey (name, avatar),
            agents!posts_agent_id_fkey (name, avatar, level)
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    createPost: async (content, agentId = null) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('posts')
          .insert({
            user_id: user.id,
            agent_id: agentId,
            content,
          })
          .select()
          .single();
        
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    likePost: async (postId) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data: existingLike, error: checkError } = await supabase
          .from('likes')
          .select('*')
          .eq('user_id', user.id)
          .eq('post_id', postId)
          .maybeSingle();

        if (checkError) throw checkError;

        if (existingLike) {
          const { error: deleteError } = await supabase
            .from('likes')
            .delete()
            .eq('id', existingLike.id);
          if (deleteError) throw deleteError;
        } else {
          const { error: insertError } = await supabase
            .from('likes')
            .insert({ user_id: user.id, post_id: postId });
          if (insertError) throw insertError;
        }

        const { count, error: countError } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', postId);

        if (countError) throw countError;

        const { error: updateError } = await supabase
          .from('posts')
          .update({ likes_count: count })
          .eq('id', postId);

        if (updateError) throw updateError;

        return { success: true, data: { likes: count } };
      } catch (error) {
        return handleError(error);
      }
    },
  },

  messages: {
    getConversations: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            other_user:users!conversations_other_user_id_fkey (name, avatar),
            agent:agents!conversations_agent_id_fkey (name, avatar, level)
          `)
          .eq('user_id', user.id)
          .order('last_message_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    getMessages: async (conversationId) => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    sendMessage: async (conversationId, content) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data: message, error: messageError } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversationId,
            sender_id: user.id,
            sender_type: 'user',
            content,
          })
          .select()
          .single();

        if (messageError) throw messageError;

        const { error: updateError } = await supabase
          .from('conversations')
          .update({
            last_message: content,
            last_message_at: new Date().toISOString(),
          })
          .eq('id', conversationId);

        if (updateError) throw updateError;

        return { success: true, data: message };
      } catch (error) {
        return handleError(error);
      }
    },

    createConversation: async (otherUserId = null, agentId = null) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            other_user_id: otherUserId,
            agent_id: agentId,
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },
  },

  contacts: {
    getContacts: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('contacts')
          .select(`
            *,
            contact_user:users!contacts_contact_user_id_fkey (name, avatar),
            contact_agent:agents!contacts_contact_agent_id_fkey (name, avatar, level)
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    addContact: async (contactUserId = null, contactAgentId = null, category) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('contacts')
          .insert({
            user_id: user.id,
            contact_user_id: contactUserId,
            contact_agent_id: contactAgentId,
            category,
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },
  },

  user: {
    getProfile: async () => {
      return supabaseApi.auth.getCurrentUser();
    },

    updateProfile: async (updates) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },
  },

  agents: {
    getAgents: async (userId = null) => {
      try {
        let query = supabase.from('agents').select('*');
        
        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    createAgent: async (agentData) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('agents')
          .insert({
            user_id: user.id,
            ...agentData,
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    updateAgent: async (agentId, updates) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
          .from('agents')
          .update(updates)
          .eq('id', agentId)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return handleError(error);
      }
    },

    deleteAgent: async (agentId) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { error } = await supabase
          .from('agents')
          .delete()
          .eq('id', agentId)
          .eq('user_id', user.id);

        if (error) throw error;
        return { success: true, data: { message: 'Agent删除成功' } };
      } catch (error) {
        return handleError(error);
      }
    },
  },
};

export default supabaseApi;
