import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Menu({ onClose, onImageSelect, setTitle }) {
    const images = [
        { src: "/deerlineart.jpg", title: "deer" },
        { src: "/eaglelineart.png", title: "eagle" },
        { src: "/japawom1.jpg", title: "yoshi" },
        { src: "/imp.jpg", title: "imp" },
        { src: "/ludo.jpg", title: "ludo" },
        { src: "/luffy.jpeg", title: "luffy" },
    ];

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 9999 }} // Ensure menu is on top of other elements
        >
            <Card className="w-full max-w-2xl">
                <CardHeader className="flex justify-between items-center">
                    <div className="flex items-center">
                        <ImageIcon className="w-10 h-10 text-primary" />
                        <CardTitle className="ml-4">Select a design to link</CardTitle>
                    </div>
                    <Button variant="ghost" onClick={onClose}>
                        <DoorClosedIcon className="w-6 h-6" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-2" // Added padding
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <Button
                                    variant="outline"
                                    className="mt-2"
                                    onClick={() => {
                                        onImageSelect(image.src)
                                        setTitle(image.title)
                                    }}
                                >
                                    Insert
                                </Button>
                                <p className="text-sm text-center mt-1 break-words"> {/* Added `break-words` */}
                                    {image.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}

// Your icon components remain the same
function DoorClosedIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
            <path d="M2 20h20" />
            <path d="M14 12v.01" />
        </svg>
    );
}

function ImageIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    );
}

export { Menu };
