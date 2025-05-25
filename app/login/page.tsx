"use client";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated polka dot background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950">
        <div className="absolute inset-0 opacity-20">
          <div className="polka-dots"></div>
        </div>
        {/* Floating orange orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-orange-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-600/15 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
            ShravyAI
          </h1>
          <p className="text-gray-300 text-lg">AI-Powered Voice Intelligence</p>
          <p className="text-gray-500 text-sm mt-1">
            Experiment. Learn. Persuade.
          </p>
        </div>
        <LoginForm />
      </div>

      <style jsx>{`
        .polka-dots {
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(249, 115, 22, 0.1) 2px,
              transparent 2px
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(249, 115, 22, 0.15) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(249, 115, 22, 0.08) 3px,
              transparent 3px
            ),
            radial-gradient(
              circle at 20% 80%,
              rgba(249, 115, 22, 0.12) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(249, 115, 22, 0.1) 2.5px,
              transparent 2.5px
            ),
            radial-gradient(
              circle at 40% 60%,
              rgba(249, 115, 22, 0.06) 1px,
              transparent 1px
            );
          background-size: 80px 80px, 120px 120px, 60px 60px, 100px 100px,
            140px 140px, 90px 90px;
          background-position: 0 0, 40px 40px, 20px 20px, 60px 10px, 10px 60px,
            70px 30px;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
      `}</style>
    </div>
  );
}
