function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-ai-accent/10 rounded-full blur-[120px] opacity-20 mix-blend-screen"></div>
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-20 mix-blend-screen"></div>
    </div>
  );
}

export default BackgroundEffects;

