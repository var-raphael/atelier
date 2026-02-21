'use client';

type ColorSelectorProps = {
  colors: { name: string; value: string; hex: number }[];
  activeColor: string;
  onColorChange: (colorName: string) => void;
  label: string;
};

export default function ColorSelector({ 
  colors, 
  activeColor, 
  onColorChange,
  label 
}: ColorSelectorProps) {
  return (
    <div className="bg-black/80 p-6 rounded-xl">
      <h3 className="text-white text-lg font-bold mb-4">{label}</h3>
      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`
              w-16 h-16 rounded-lg transition-all
              ${activeColor === color.name 
                ? 'ring-4 ring-green-500 scale-110' 
                : 'ring-2 ring-transparent hover:ring-white'
              }
            `}
            style={{ background: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}