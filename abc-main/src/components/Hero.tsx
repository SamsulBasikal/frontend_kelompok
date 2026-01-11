import { Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-teal-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-100">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-gray-700">Project AI Assistant Campus</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
            Meet <span className="text-blue-600">Nicole Orithyia</span>
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mt-2">
              Karya Kelompok TI25A
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami membuat asisten virtual cerdas untuk membantu mahasiswa mendapatkan informasi akademik dengan lebih cepat dan mudah.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"></div>
          <div className="relative bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              
              <div className="space-y-2">
                <div className="flex justify-center items-center gap-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  <Rocket className="w-8 h-8 text-cyan-600" />
                  4
                </div>
                <div className="text-sm text-gray-600 font-medium">Team Members</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  1
                </div>
                <div className="text-sm text-gray-600 font-medium">Shared Vision</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-gray-600 font-medium">Dedication</div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}