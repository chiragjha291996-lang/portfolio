import { useEffect } from 'react';
import ProjectChatPanel from './ProjectChatPanel';

function ProjectChatModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md h-[520px] max-h-[85vh] glass-panel rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
      >
        <ProjectChatPanel project={project} showHeader={true} onClose={onClose} />
      </div>
    </div>
  );
}

export default ProjectChatModal;
