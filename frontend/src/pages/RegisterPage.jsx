import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient golden glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Golden glow behind card top */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[280px] h-[120px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0.08) 50%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl p-8 sm:p-10 shadow-2xl z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(40,36,28,0.92) 0%, rgba(22,22,22,0.96) 100%)',
            border: '1px solid rgba(201,168,76,0.15)',
            boxShadow: '0 0 80px rgba(201,168,76,0.06), 0 25px 50px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
            }}
          />

          <RegisterForm />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
