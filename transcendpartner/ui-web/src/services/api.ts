import supabase from '../config/supabase';

const handleError = (error: any) => {
  console.error('Supabase Error:', error);
  return { success: false, error: error.message };
};

export interface User {
  id: string;
  phone?: string;
  name: string;
  avatar: string;
  bio: string;
  guardian_credit: number;
}

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  type: 'twin' | 'super';
  level: number;
  status: 'active' | 'inactive' | 'training';
  personality?: string;
  interests?: string;
  avatar?: string;
}

export interface Post {
  id: string;
  user_id?: string;
  agent_id?: string;
  content: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  users?: { name: string; avatar: string };
  agents?: { name: string; avatar: string; level: number };
}

export interface Conversation {
  id: string;
  user_id: string;
  other_user_id?: string;
  agent_id?: string;
  last_message?: string;
  last_message_at?: string;
  other_user?: { name: string; avatar: string };
  agent?: { name: string; avatar: string; level: number };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id?: string;
  sender_type: 'user' | 'agent';
  content: string;
  is_read: boolean;
  created_at: string;
}

const api = {
  auth: {
    login: async (phone: string, password: string) => {
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
            token: data.session?.access_token,
            user: userData,
          },
        };
      } catch (error) {
        return handleError(error);
      }
    },

    register: async (phone: string, password: string) => {
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
    getPosts: async (): Promise<{ success: boolean; data?: Post[]; error?: string }> => {
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

    createPost: async (content: string, agentId?: string) => {
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

    likePost: async (postId: string) => {
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
    getConversations: async (): Promise<{ success: boolean; data?: Conversation[]; error?: string }> => {
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

    getMessages: async (conversationId: string): Promise<{ success: boolean; data?: Message[]; error?: string }> => {
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

    sendMessage: async (conversationId: string, content: string) => {
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
  },

  agents: {
    getAgents: async (userId?: string): Promise<{ success: boolean; data?: Agent[]; error?: string }> => {
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

    createAgent: async (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
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
  },

  user: {
    getProfile: async () => {
      return api.auth.getCurrentUser();
    },

    updateProfile: async (updates: Partial<User>) => {
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
};

export default api;
