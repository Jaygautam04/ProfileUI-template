"use client"

import { motion } from "framer-motion"
import { ProfileCard } from "@/components/profile-card"
import { GalleryCard } from "@/components/gallery-card"

export default function Home() {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-[#2d3748] via-[#1a202c] to-[#2d3748] flex overflow-hidden relative">
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Left half - empty with subtle animation */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="w-full lg:w-1/2 flex flex-col gap-5 p-4 sm:p-6 md:p-8 lg:p-12 relative z-10">
        <ProfileCard />
        <GalleryCard />
      </div>
    </div>
  )
}
