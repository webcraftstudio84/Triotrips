import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    signIn,
    signUp,
    error: authError
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (authModalMode === 'signin') {
        await signIn(email, password);
        setSuccessMsg('Successfully signed in!');
        setTimeout(() => {
          closeAuthModal();
        }, 600);
      } else {
        if (!fullName.trim()) {
          setLocalError('Please enter your full name');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setLocalError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName, phone);
        setSuccessMsg('Account created successfully! You are now logged in.');
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setLocalError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = authModalMode === 'signin';
  const displayError = localError || authError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative my-4 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#024a20] via-[#04823a] to-[#06C258] text-white p-5 sm:p-6 relative shrink-0 shadow-md">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-lg border border-white/30 backdrop-blur-sm shadow">
              <i className={isSignIn ? 'fa-solid fa-user-lock' : 'fa-solid fa-user-plus'}></i>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                {isSignIn ? 'Sign In to Triotrips' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-white/80">
                {isSignIn ? 'Manage your bookings and tour plans' : 'Join thousands of happy travelers'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-100 bg-gray-50/70 p-1.5 mx-5 mt-4 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setLocalError(null);
              openAuthModal('signin');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isSignIn
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setLocalError(null);
              openAuthModal('signup');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isSignIn
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {displayError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
              <span>{displayError}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-sm shrink-0"></i>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-gray-400 text-xs">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] focus:ring-1 focus:ring-[#06C258] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-gray-400 text-xs">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] focus:ring-1 focus:ring-[#06C258] outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400 text-xs">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] focus:ring-1 focus:ring-[#06C258] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400 text-xs">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignIn ? 'Enter password' : 'Min 6 characters'}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] focus:ring-1 focus:ring-[#06C258] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-green w-full !py-3 !text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isSignIn ? 'Sign In' : 'Create My Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-gray-500">
            {isSignIn ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="text-[#06C258] font-bold hover:underline"
                >
                  Sign up for free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="text-[#06C258] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
