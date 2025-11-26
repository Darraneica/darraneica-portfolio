export function FloralDecor() {
  return (
    <>
      {/* Decorative floating flowers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">🌸</div>
        <div className="absolute top-40 right-20 text-3xl opacity-15 animate-float-delayed">🌺</div>
        <div className="absolute bottom-32 left-1/4 text-5xl opacity-10 animate-float">🌷</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-20 animate-float-delayed">🌸</div>
        <div className="absolute bottom-20 right-1/3 text-3xl opacity-15 animate-float">🌺</div>
        <div className="absolute top-1/2 left-1/3 text-4xl opacity-10 animate-float-delayed">🌼</div>
      </div>
    </>
  )
}
