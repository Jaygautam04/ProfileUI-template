"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, type PanInfo, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const initialImages = [
  "/modern-architectural-structure-with-curved-lines.jpg",
  "/contemporary-building-with-geometric-patterns.jpg",
  "/abstract-architectural-design-with-flowing-curves.jpg",
]

export function GalleryCard() {
  const [images, setImages] = useState(initialImages)
  const [currentIndex, setCurrentIndex] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const handleAddImage = () => {
    const newImage = "/architectural-masterpiece-with-modern-design.jpg"
    setImages([...images, newImage])
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      x.set(-(currentIndex - 1) * 230)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex(currentIndex + 1)
      x.set(-(currentIndex + 1) * 230)
    }
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (Math.abs(velocity) >= 500) {
      if (velocity > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (velocity < 0 && currentIndex < images.length - 3) {
        setCurrentIndex(currentIndex + 1)
      }
    } else if (Math.abs(offset) > 100) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (offset < 0 && currentIndex < images.length - 3) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
    >
      <Card className="bg-[#363C43] border-none shadow-[5px_5px_10px_rgba(0,0,0,0.5)] rounded-[18px] relative transition-all duration-300 hover:shadow-[5px_5px_20px_rgba(0,0,0,0.7),0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1">
        <motion.div
          className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#171717] flex items-center justify-center cursor-pointer z-20"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <HelpCircle className="w-4 h-4 text-[#A0A0A0]" />
        </motion.div>

        <motion.div
          className="absolute top-[72px] left-4 flex flex-col gap-[3px] z-20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-[3px]">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="w-[5px] h-[5px] rounded-[1px] bg-[#4A4E54]" />
              ))}
            </div>
          ))}
        </motion.div>

        <CardHeader className="pt-4 pb-0">
          <CardTitle className="text-white text-[18px] font-medium pl-8 transition-all duration-200 hover:text-[#E0E0E0]">
            Gallery
          </CardTitle>
          <CardAction>
            <Button
              onClick={handleAddImage}
              className="bg-[#FFFFFF08] hover:bg-[#FFFFFF15] text-white text-[12px] font-semibold px-5 py-4 rounded-[20px] shadow-[4px_5px_30px_5px_rgba(16,18,19,1),-5px_-3px_30px_-10px_rgba(150,150,150,0.12)] transition-all duration-200 hover:scale-105 hover:shadow-[4px_5px_35px_8px_rgba(16,18,19,1),-5px_-3px_35px_-8px_rgba(150,150,150,0.15)] active:scale-95"
            >
              + ADD IMAGE
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="pt-8 pb-6 px-12">
          <div className="flex items-center gap-6">
            <motion.button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-[#303439] to-[#161718] shadow-[-4px_-2px_15px_0px_rgba(69,69,69,0.5),5px_4px_15px_0px_rgba(0,0,0,0.5)] flex items-center justify-center disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#6F787C]" />
            </motion.button>

            <div ref={constraintsRef} className="flex-1 overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                animate={{ x: -currentIndex * 230 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex gap-5 cursor-grab active:cursor-grabbing"
                style={{ x }}
              >
                <AnimatePresence>
                  {images.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      exit={{ scale: 0, opacity: 0, rotateY: 90 }}
                      whileHover={{
                        scale: 0.88,
                        rotateY: 12,
                        rotateX: -8,
                        z: 60,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1,
                      }}
                      className="relative w-[230px] h-[210px] rounded-[24px] overflow-hidden flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 group"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: 1200,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/25 group-hover:via-purple-500/20 group-hover:to-pink-500/25 transition-all duration-500 z-10 pointer-events-none"
                        whileHover={{
                          background: [
                            "linear-gradient(135deg, rgba(59,130,246,0) 0%, rgba(168,85,247,0) 50%, rgba(236,72,153,0) 100%)",
                            "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(168,85,247,0.2) 50%, rgba(236,72,153,0.25) 100%)",
                            "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(168,85,247,0.25) 50%, rgba(236,72,153,0.3) 100%)",
                          ],
                        }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-[24px] border-2 border-transparent group-hover:border-white/30 transition-all duration-500 z-10 pointer-events-none"
                        whileHover={{
                          boxShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 20px rgba(255,255,255,0.3)",
                            "0 0 30px rgba(255,255,255,0.4)",
                          ],
                        }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      />

                      <motion.div
                        className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/40 rounded-tr-[20px] transition-all duration-500 z-10"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div
                        className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/40 rounded-bl-[20px] transition-all duration-500 z-10"
                        whileHover={{ scale: 1.2 }}
                      />

                      <motion.div
                        className="absolute inset-0"
                        whileHover={{
                          scale: 1.15,
                          rotate: 2,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={src || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            initial={{ x: "50%", y: "50%", opacity: 0 }}
                            whileHover={{
                              x: `${Math.random() * 100}%`,
                              y: `${Math.random() * 100}%`,
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= images.length - 3}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-[#303439] to-[#161718] shadow-[-4px_-2px_15px_0px_rgba(69,69,69,0.5),5px_4px_15px_0px_rgba(0,0,0,0.5)] flex items-center justify-center disabled:opacity-40 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#6F787C]" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
