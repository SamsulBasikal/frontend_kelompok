import { useState } from 'react';
import { Users, Edit3, Image as ImageIcon, Check, X } from 'lucide-react';

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

export default function TeamSection({ members, onUpdatePhoto, onUpdateInfo }: TeamSectionProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', photo: '' });

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setEditForm({ name: member.name, role: member.role, photo: member.photo });
  };

  const handleSave = (id: number) => {
    onUpdateInfo(id, editForm.name, editForm.role);
    onUpdatePhoto(id, editForm.photo);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            <Users className="w-4 h-4" />
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet the <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Dream Team</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four passionate individuals working together to create something amazing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {editingId === member.id ? (
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Photo URL
                    </label>
                    <input
                      type="text"
                      value={editForm.photo}
                      onChange={(e) => setEditForm({ ...editForm, photo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={editForm.photo}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Member name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">Role</label>
                    <input
                      type="text"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Member role"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(member.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(member)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-cyan-600 hover:text-white transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
