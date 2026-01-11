import { Users } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
}

interface TeamSectionProps {
  members: TeamMember[];
  onUpdatePhoto: (id: number, newPhoto: string) => void;
  onUpdateInfo: (id: number, name: string, role: string) => void;
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            <Users className="w-4 h-4" />
            Kelompok Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Tunggu <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">we are here</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Anggota kelompok kami yang berdedikasi dan bersemangat di balik proyek ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{member.role}</p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active member
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}