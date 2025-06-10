import { useState } from 'react';
import styles from './MessagesTable.module.css';
import MessageCard from '../MessageCard/MessageCard';

export default function MessagesTable({ conversations = [], selectedConversation, onSelectConversation }) { 
    const [busca, setBusca] = useState('');

    const filteredConversations = conversations.filter(conversation => 
        conversation.name.toLowerCase().includes(busca.toLowerCase())
    );

    return ( 
        <div className={styles.tabelaMensagens}> 
            <h2>Mensagens</h2>
            <input
                type="text"
                placeholder="Pesquise por alguém..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
            {filteredConversations.map(conversation => (
                <MessageCard 
                    key={conversation.id}
                    profilePicture={conversation.profilePicture}
                    username={conversation.name}
                    ultimaMensagem={conversation.lastMessage}
                    isSelected={selectedConversation === conversation.id}
                    onClick={() => onSelectConversation(conversation.id)}
                />
            ))}
        </div>
    )
}