import React, { useState, useEffect } from 'react';
import { ChatData, ChatResult } from '../types/chat';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useToast } from '../hooks/use-toast';


export default ChatApp;