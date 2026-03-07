function TechTag({ name, color = 'bg-blue-500' }) {
  return (
    <span className="tech-tag">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      {name}
    </span>
  );
}

export default TechTag;

