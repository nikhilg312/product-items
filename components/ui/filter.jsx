'use client';
import { useState } from 'react';
import { Card } from './card';
import FilterModal from "@/modal/filter-modal"
const Filter = ({ filters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [mainFilters, setFilters] = useState(filters);
    return (
        <Card className="pt-6 p-2 h-40 border-dashed rounded-none flex justify-center items-center">
            <div className="border w-100 border-solid border-1 border-light-gray-100 rounded-sm p-4">
                {mainFilters.length === 0 ? (
                    <button onClick={openModal}>
                        Add Product Filter
                    </button>
                ) : (
                    mainFilters.map((it, index) => (
                        <div key={index} onClick={openModal} className = "cursor-pointer margin-bottom-10">
                            {it.map((item, index) => (
                                <span key={index} className={`border border-1 border-solid p-2 rounded-sm ${index === 1 ? 'success-bg' : ''}`}>
                                    {item}
                                </span>
                            )
                            )}
                        </div>
                    ))
                )}
                <FilterModal isOpen={isModalOpen} onClose={closeModal} setFilters={setFilters} filters={filters} />
            </div>
        </Card>
    );
}

export { Filter };