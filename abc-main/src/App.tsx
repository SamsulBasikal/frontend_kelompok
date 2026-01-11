import { useState } from 'react';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Member 1',
      role: 'Project Leader',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Member 2',
      role: 'Developer',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Member 3',
      role: 'Designer',
      photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Member 4',
      role: 'Analyst',
      photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [chatbotConfig, setChatbotConfig] = useState({
    vercelUrl: 'https://your-chatbot.vercel.app',
    iconUrl: 'https://images.pexels.com/photos/8294620/pexels-photo-8294620.jpeg?auto=compress&cs=tinysrgb&w=200'
  });

  const updateMemberPhoto = (id: number, newPhoto: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, photo: newPhoto } : member
      )
    );
  };

  const updateMemberInfo = (id: number, name: string, role: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, name, role } : member
      )
    );
  };

  const updateChatbotConfig = (vercelUrl: string, iconUrl: string) => {
    setChatbotConfig({ vercelUrl, iconUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Hero />
      <TeamSection
        members={teamMembers}
        onUpdatePhoto={updateMemberPhoto}
        onUpdateInfo={updateMemberInfo}
      />
      <ChatbotWidget
        vercelUrl={chatbotConfig.vercelUrl}
        iconUrl={chatbotConfig.iconUrl}
        onUpdateConfig={updateChatbotConfig}
      />
    </div>
  );
}

export default App;
