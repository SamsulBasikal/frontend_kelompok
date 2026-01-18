import { useState } from 'react';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ChatbotWidget from './components/ChatbotWidget';
import myIcon from './assets/avatar.png';

function App() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Adit',
      role: 'Artist',
      photo: 'https://media1.tenor.com/m/-6gqeLSqSkEAAAAd/funny-valentine-jojo%27s-bizarre-adventure-manga.gif'
    },
    {
      id: 2,
      name: 'Dzikri',
      role: 'Dzikri udah vaksin',
      photo: 'https://media1.tenor.com/m/zvmqwAzfYRAAAAAd/doaibu-spongebob.gif'
    },
    {
      id: 3,
      name: 'Willy Salim',
      role: 'Salim',
      photo: 'https://media1.tenor.com/m/IIXy6CqR5l8AAAAd/mrbeast-ytpmv.gif'
    },
    {
      id: 4,
      name: 'Zulvikar',
      role: 'Bibup',
      photo: 'https://media1.tenor.com/m/-O1PpXl9In8AAAAd/6-7-biboo.gif'
    }
  ]);

  const [chatbotConfig, setChatbotConfig] = useState({
    vercelUrl: 'https://nicole-sand.vercel.app',
    iconUrl: myIcon
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
