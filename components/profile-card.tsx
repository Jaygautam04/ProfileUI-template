"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

const tabs = [
  { id: "about", label: "About Me" },
  { id: "experiences", label: "Experiences" },
  { id: "recommended", label: "Recommended" },
]

export function ProfileCard() {
  const [activeTab, setActiveTab] = useState("recommended")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
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

        <CardContent className="pt-16 pb-8 px-12">
          {/* Custom Tabs */}
          <div className="bg-[#171717] rounded-[23px] p-[6px] flex gap-[6px] mb-8 relative">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-10 flex-1 px-6 py-3 text-[15px] font-medium transition-colors duration-200 ${
                  activeTab === tab.id ? "text-white" : "text-[#A3ADB2] hover:text-[#C5CDD2]"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}

            {/* Animated background pill */}
            <motion.div
              layoutId="activeTab"
              className="absolute top-[6px] bottom-[6px] bg-[#28292F] rounded-[17px] shadow-[8px_8px_15px_rgba(0,0,0,0.4),-5px_-5px_10px_rgba(58,58,58,0.1)]"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
              style={{
                left: `${tabs.findIndex((t) => t.id === activeTab) * 33.333 + 2}%`,
                width: "calc(33.333% - 4px)",
              }}
            />
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -10, x: 10 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="absolute inset-0 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#4A4E54] scrollbar-track-transparent"
              >
                {activeTab === "about" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-[#969696] text-[16px] leading-[25px] text-balance"
                  >
                    Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for
                    5 years now.
                    <br />
                    <br />I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my
                    wife Tiffany and my 4 year old twin daughters - Emma and Ella. Both of them are just starting
                    school, so my calendar is usually blocked between 9-10 AM. This is a...
                  </motion.p>
                )}
                {activeTab === "experiences" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-[#969696] text-[16px] leading-[25px] text-balance"
                  >
                    I have over 5 years of experience in sales and customer relations at Salesforce. My expertise
                    includes enterprise solutions, client management, and building long-term partnerships with Fortune
                    500 companies.
                  </motion.p>
                )}
                {activeTab === "recommended" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-[#969696] text-[16px] leading-[25px] text-balance"
                  >
                    Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for
                    3 years now.
                    <br />
                    <br />I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my
                    wife Tiffany and my 4 year old twin daughters - Emma and Ella. Both of them are just starting
                    school, so my calendar is usually blocked between 9-10 AM. This is a...
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
