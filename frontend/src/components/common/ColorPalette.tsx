interface ColorPaletteProps {
    onColorSelect: (color: string) => void;
    onClose: () => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect, onClose }) => {
    return (
        <div className="absolute left-0 top-8 z-10 bg-white shadow rounded-md border border-gray-200">
            <button
                className="block w-full text-left py-2 px-4 hover:bg-red-100 text-red-700"
                onClick={() => {
                    onColorSelect("#fef2f2"); // red-50
                    onClose();
                }}>
                Red
            </button>
            <button
                className="block w-full text-left py-2 px-4 hover:bg-yellow-100 text-yellow-700"
                onClick={() => {
                    onColorSelect("#fefce8"); // yellow-50
                    onClose();
                }}>
                Yellow
            </button>
            <button
                className="block w-full text-left py-2 px-4 hover:bg-green-100 text-green-700"
                onClick={() => {
                    onColorSelect("#f0fdf4"); // green-50
                    onClose();
                }}>
                Green
            </button>
        </div>
    );
};
