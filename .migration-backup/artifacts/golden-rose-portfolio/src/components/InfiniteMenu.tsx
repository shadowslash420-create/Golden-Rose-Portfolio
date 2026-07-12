import { useEffect, useRef } from "react";

interface MenuItem {
  image: string;
  link?: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items: MenuItem[];
  scale?: number;
}

export default function InfiniteMenu({ items, scale = 1 }: InfiniteMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: -10, y: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, lastX: 0, lastY: 0, velX: 0, velY: 0 });
  const rafRef = useRef<number | null>(null);
  const inertiaRef = useRef({ vx: 0, vy: 0 });

  const n = items.length;
  const radius = Math.max(220, n * 38) * scale;

  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    const applyRotation = () => {
      sphere.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    };

    const tick = () => {
      if (!dragRef.current.active) {
        inertiaRef.current.vx *= 0.93;
        inertiaRef.current.vy *= 0.93;
        rotationRef.current.y += inertiaRef.current.vx;
        rotationRef.current.x += inertiaRef.current.vy;
        rotationRef.current.x = Math.max(-40, Math.min(40, rotationRef.current.x));
        applyRotation();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMouseDown = (e: MouseEvent) => {
      dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, lastX: e.clientX, lastY: e.clientY, velX: 0, velY: 0 };
      inertiaRef.current = { vx: 0, vy: 0 };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      dragRef.current.velX = dx;
      dragRef.current.velY = dy;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      rotationRef.current.y += dx * 0.4;
      rotationRef.current.x -= dy * 0.4;
      rotationRef.current.x = Math.max(-40, Math.min(40, rotationRef.current.x));
      applyRotation();
    };

    const onMouseUp = () => {
      if (!dragRef.current.active) return;
      inertiaRef.current.vx = dragRef.current.velX * 0.4;
      inertiaRef.current.vy = -dragRef.current.velY * 0.4;
      dragRef.current.active = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      dragRef.current = { active: true, startX: t.clientX, startY: t.clientY, lastX: t.clientX, lastY: t.clientY, velX: 0, velY: 0 };
      inertiaRef.current = { vx: 0, vy: 0 };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.active) return;
      const t = e.touches[0];
      const dx = t.clientX - dragRef.current.lastX;
      const dy = t.clientY - dragRef.current.lastY;
      dragRef.current.velX = dx;
      dragRef.current.velY = dy;
      dragRef.current.lastX = t.clientX;
      dragRef.current.lastY = t.clientY;
      rotationRef.current.y += dx * 0.4;
      rotationRef.current.x -= dy * 0.4;
      rotationRef.current.x = Math.max(-40, Math.min(40, rotationRef.current.x));
      applyRotation();
      e.preventDefault();
    };

    const onTouchEnd = () => {
      inertiaRef.current.vx = dragRef.current.velX * 0.4;
      inertiaRef.current.vy = -dragRef.current.velY * 0.4;
      dragRef.current.active = false;
    };

    // Auto-rotate slowly
    inertiaRef.current.vx = 0.3;

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ height: `${(radius + 160) * scale}px`, perspective: `${800 * scale}px` }}
    >
      <div
        ref={sphereRef}
        style={{
          width: 0,
          height: 0,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(-10deg) rotateY(0deg)`,
          transition: "none",
        }}
      >
        {items.map((item, i) => {
          const angleY = (360 / n) * i;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${180 * scale}px`,
                height: `${220 * scale}px`,
                left: `${-90 * scale}px`,
                top: `${-110 * scale}px`,
                transformStyle: "preserve-3d",
                transform: `rotateY(${angleY}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="w-full h-full group relative rounded-2xl overflow-hidden shadow-2xl border-2 border-rose-100/60 hover:border-rose-300 transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <h3 className="font-serif text-white text-sm leading-tight mb-1" style={{ direction: "rtl" }}>{item.title}</h3>
                  <p className="text-rose-200 text-xs leading-tight" style={{ direction: "rtl" }}>{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
