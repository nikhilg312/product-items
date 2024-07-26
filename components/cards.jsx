"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from "lucide-react"
import { Variant } from "./ui/variant"
import { Filter } from "./ui/filter"
import Alert from "./alert";
const allVariants = new Map();

allVariants.set(1, {
  id: 1,
  title: "deer",
  image: "/deerlineart.jpg",
});
allVariants.set(2, {
  id: 2,
  title: "imp",
  image: "/imp.jpg",
});
const initialState = [
  {
    id: "1",
    filters: [],
    variants: [
      allVariants.get(1),
      allVariants.get(1)
    ],
  },
  {
    id: "2",
    filters: [],
    variants: [
      allVariants.get(2),
      allVariants.get(2)
    ],
  },
]
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export function Cards() {
  const [stateAdded, setStateAdded] = useState(false);
  const [stateRemoved, setStateRemoved] = useState(false);
  const [variantAdded, setVariantAdded] = useState(false);
  const [variantRemoved, setVariantRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = async(str) => {
    console.log(str);
    setLoading(true);
    await sleep(2000);
    setLoading(false);
    if (str == "stateAdded") {
      setStateAdded(true);
    }
    if (str == "stateRemoved") {
      setStateRemoved(true);
    }
    if (str == "variantAdded") {
      setVariantAdded(true);
    }
    if (str == "variantRemoved") {
      setVariantRemoved(true);
    }
  };
  console.log('stateAdded:', stateAdded);
  console.log('stateRemoved:', stateRemoved);
  console.log('variantAdded:', variantAdded);
  console.log('variantRemoved:', variantRemoved);

  const handleAlertClose = () => {
    console.log('Alert closed');
    if (stateAdded) {
      setStateAdded(false);
    }
    if (stateRemoved) {
      setStateRemoved(false);
    }
    if (variantAdded) {
      setVariantAdded(false);
    }
    if (variantRemoved) {
      setVariantRemoved(false);
    }
  };
  const [states, setStates] = useState(initialState)
  const [variantCount, setVariantCount] = useState(2)
  const addState = () => {
    const newState = {
      id: (states.length + 1).toString(),
      filters: [],
      variants: Array(variantCount).fill({ title: "", image: "/plus.png" }),
    }
    setStates([...states, newState])
  }
  const removeState = (id) => {
    setStates(states.filter((state) => state.id !== id))
  }
  const addVariant = () => {
    setVariantCount(variantCount + 1)
    setStates(states.map((state) => ({
      ...state,
      variants: [...state.variants, { title: "", image: "/plus.png" }],
    })))
  }
  const removeVariant = (index) => {
    setVariantCount(variantCount - 1)
    setStates(states.map((state) => ({
      ...state,
      variants: state.variants.filter((_, i) => i !== index),
    })))
  }
  function onDragEnd(result) {
    if (!result.destination) {
      console.log('Kindly Drop Within Window');
      return;
    }

    const items = Array.from(states);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    setStates(items);
  }

  return (
    (<div className="p-4">
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th className="layout">

              </th>
              <th className="width-bd">Product Filter</th>
              {Array.from({ length: variantCount }, (_, i) => (
                <th className="layout" key={i}>
                  Variant {i + 1}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      handleClick("variantRemoved");
                      removeVariant(i)
                    }
                    }>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                  {variantRemoved && (
                    <Alert
                      message="Variant Removed"
                      duration={2000}
                      onClose={handleAlertClose}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="states">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {states.map((state, x) => {
                    return (
                      <Draggable key={state.id} draggableId={state.id} index={x}>
                        {(provided) => (
                          <tr ref={provided.innerRef} {...provided.draggableProps} key={state.id}>
                            <td className="layout">
                              <div className="flex items-center">
                                <span className="group">
                                  <TrashIcon
                                    onClick={() => {
                                      handleClick("stateRemoved");
                                      removeState(state.id);
                                    }}
                                    className="h-4 w-4 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                  />
                                </span>
                                {stateRemoved && (
                                  <Alert
                                    message="State Removed"
                                    duration={2000}
                                    onClose={handleAlertClose}
                                  />
                                )}

                                <strong>{x + 1}</strong>
                                <span {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVertical className="text-neutral-500" size={30} />
                                </span>
                              </div>
                            </td>
                            <td className="width-bd">
                              {/* <Card className="pt-6 p-2 h-40 border-dashed rounded-none flex justify-center items-center">
                                <div className="border w-60 border-solid border-1 border-light-gray-100 rounded-sm p-4">
                                  {state.filter.length === 0 ? (
                                    <button onClick={openModal}>
                                      Add Product Filter
                                    </button>
                                  ) : (
                                    state.filter.map((it, index) => (
                                      it.map((item, index) => (
                                        <span key={index} className={`border border-1 border-solid p-2 rounded-sm ${index === 1 ? 'success-bg' : ''}`}>
                                          {item}
                                        </span>
                                      )
                                      )
                                    ))
                                  )}
                                  {state.filter.map((item, index) => (
                                    <span className="p-2"><span className={`border border-1 border-solid p-2 rounded-sm ${index === 1 ? 'success-bg' : ''}`}>{item}</span></span>
                                  ))}
                                  <FilterModal isOpen={isModalOpen} onClose={closeModal} state={state} />
                                </div>
                              </Card> */}
                              <Filter filters={state.filters} />
                            </td>
                            {state.variants.map((variant, i) => (
                              <td className="layout" key={i}>
                                {/* <div className="flex flex-column justify-center items-center"><Card className="border-dashed rounded-none p-2 w-40 h-40">
                                  <img src="/placeholder.svg" className="w-35 h-35 pt-2 pl-4 pr-4 pb-2" alt={variant.title} />
                                  <span>{variant.title}</span>
                                </Card></div> */}
                                <Variant title={variant.title} image={variant.image} />
                              </td>
                            ))}
                            <td className="layout">
                              <Button variant="ghost" size="icon" onClick={() => {
                                handleClick("variantAdded");
                                addVariant(state.id)
                              }
                              }>
                                <AddIcon />
                              </Button>
                              {variantAdded && (
                                <Alert
                                  message="Variant Added"
                                  duration={2000}
                                  onClose={handleAlertClose}
                                />
                              )}
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <tr>
                    <td className="layout">
                      <div className="flex items-center">
                        <Button onClick={() => {
                          handleClick("stateAdded");
                          addState();
                        }}>
                          <AddIcon />
                        </Button>
                        {stateAdded && (
                          <Alert
                            message="State Added"
                            duration={2000}
                            onClose={handleAlertClose}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
        {loading && (
        <div className="loadingOverlay">
          <div className="loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      </div>
    </div>)
  );
}

function TrashIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}
function AddIcon(props) {
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
      strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
