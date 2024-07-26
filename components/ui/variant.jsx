'use client';
import { useState } from 'react';
import { Card } from './card';
import { Menu } from './menu';

const Variant = ({ title, image }) => {

    const [selectedImage, setSelectedImage] = useState(image);
    const [subTitle, setTitle] = useState(title);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleImageClick = () => {
        setIsMenuOpen(true);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleImageChange = (newImage) => {
        setSelectedImage(newImage);
        handleMenuClose();
    };


    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <Card className="border-dashed rounded-none p-2 w-40 h-40">
                    <div
                        style={{ width: '9.1rem', height: '8.0rem' }} // 7.5rem = 30 * 0.25rem
                        className="pt-2 pl-4 pr-4 cursor-pointer"
                    >
                        <img
                            src={selectedImage}
                            className="w-full h-full object-cover"
                            alt="Variant"
                            onClick={handleImageClick}
                        />
                    </div>
                    <span className="pb-4 pl-6 pr-4">{subTitle}</span>
                </Card>
            </div>
            {isMenuOpen && (
                <Menu onClose={handleMenuClose} onImageSelect={handleImageChange} setTitle={setTitle} />
            )}
        </div>

    );
}

export { Variant };