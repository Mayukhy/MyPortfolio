"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AudioWaveform, Search } from "lucide-react";
import { createPortal } from "react-dom";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useSounds } from "@/hooks/useSounds";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { allThemes } from "@/constants";

interface CreateThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateThemeModal({
  isOpen,
  onClose,
}: CreateThemeModalProps) {
  const {
    createThemeStep,
    setCreateThemeStep,
    createThemeData,
    setCreateThemeData,
    themeList,
    setThemeList,
    setTheme,
    setCurrentMusic,
    setIsPlaying,
  } = useTheme();
  const { playButtonPress, playClick } = useSounds();
  const { toast } = useToast();
  const [isCompressing, setIsCompressing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleThemes, setVisibleThemes] = useState(6);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

  // Cleanup body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Reset search and pagination when step changes
  useEffect(() => {
    if (createThemeStep !== 2) {
      setSearchQuery("");
      setVisibleThemes(6);
    }
  }, [createThemeStep]);

  // Reset fade states when search query changes
  useEffect(() => {
    setShowTopFade(false);
    setShowBottomFade(true);
  }, [searchQuery, visibleThemes]);

  const nextStep = () => {
    playButtonPress();
    if (createThemeStep < 3) {
      setCreateThemeStep(createThemeStep + 1);
    }
  };

  const prevStep = () => {
    playClick();
    if (createThemeStep > 1) {
      setCreateThemeStep(createThemeStep - 1);
    }
  };

  const updateCreateThemeData = (field: string, value: any) => {
    setCreateThemeData({
      ...createThemeData,
      [field]: value,
    });
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !createThemeData.tags?.includes(tag.trim())) {
      updateCreateThemeData("tags", [...createThemeData.tags!, tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateCreateThemeData(
      "tags",
      createThemeData.tags?.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleClose = () => {
    playClick();
    // Clean up any session storage audio files that weren't saved
    if (createThemeData.src?.startsWith("session:")) {
      const audioId = createThemeData.src.replace("session:", "");
      sessionStorage.removeItem(`audio-${audioId}`);
    }
    onClose();
    setCreateThemeStep(1);
    setCreateThemeData({
      name: "",
      description: "",
      audioFile: null,
      colorScheme: "",
      tags: [],
    });
  };

  if (!isOpen) return null;

  const handleTheme = () => {
    if (createThemeData.id) {
      updateTheme();
    } else {
      CreateNewTheme();
    }
  };

  const CreateNewTheme = () => {
    if (themeList.find((theme) => theme.name === createThemeData.name)) {
      toast({
        title: "Error",
        description: "Theme already exists",
        variant: "destructive",
      });
      return;
    }
    setThemeList([
      ...themeList,
      { ...createThemeData, id: crypto.randomUUID() },
    ]);
    toast({
      title: "Success",
      description: "Theme created successfully",
    });
    handleClose();
  };

  const updateTheme = () => {
    const theme = themeList.find((theme) => theme.id === createThemeData.id);
    if (!theme) return;
    setThemeList(
      themeList.map((t) =>
        t.id === createThemeData.id ? { ...createThemeData } : t
      )
    );
    toast({
      title: "Success",
      description: "Theme updated successfully",
    });
    setTheme(
      createThemeData.colorScheme.split(" ")[1] as
        | "dark"
        | "light"
        | "system"
        | "lofi"
        | "nature"
        | "rain"
        | "ocean"
        | "forest"
        | "cafe"
        | "warm"
        | "cool"
        | "neutral"
        | "vibrant"
        | "pastel"
        | "monochrome"
        | "sunset"
        | "midnight"
        | "trees"
        | "desert"
        | "aurora"
        | "neon"
        | "spring"
        | "summer"
        | "autumn"
        | "winter"
        | "cosmic"
        | "galaxy"
        | "mountain"
        | "city"
        | "vintage"
        | "retro"
        | "cyberpunk"
        | "steampunk"
        | "minimalist"
        | "luxury"
        | "rustic"
        | "tropical"
        | "arctic"
        | "sahara"
    );
    setCurrentMusic({
      name: createThemeData.name,
      src: getAudioSrc(createThemeData.src),
    });
    if (createThemeData.src) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    handleClose();
  };

  const getAudioSrc = (src: string | undefined): string => {
    if (!src) return "";
    if (src.startsWith("session:")) {
      const audioId = src.replace("session:", "");
      return sessionStorage.getItem(`audio-${audioId}`) || "";
    }
    return src;
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size first
      if (file.size > 20 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an audio file smaller than 20MB",
          variant: "destructive",
        });
        return;
      }

      // Upload audio file
      uploadAudioHandler(file);
    }
  };

  const uploadAudioHandler = async (file: File) => {
    setIsCompressing(true);

    try {
      const audioUrl = await uploadToCloudinary(file);

      // Store the compressed audio URL
      updateCreateThemeData("src", audioUrl);

      toast({
        title: "Audio uploaded successfully",
        description: "File uploaded and compressed to Cloudinary",
        variant: "default",
      });
    } catch (error) {
      console.error("Upload failed:", error);

      // Provide more specific error messages
      let errorMessage = "Failed to upload audio file. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Cloudinary cloud name is not configured")) {
          errorMessage =
            "Cloudinary is not configured. Please check your environment variables.";
        } else if (
          error.message.includes("Cloudinary upload preset is not configured")
        ) {
          errorMessage =
            "Cloudinary upload preset is not configured. Please check your environment variables.";
        } else if (error.message.includes("Unsupported file type")) {
          errorMessage = error.message;
        } else if (error.message.includes("File size too large")) {
          errorMessage = error.message;
        } else if (error.message.includes("Bad request")) {
          errorMessage =
            "Invalid request to Cloudinary. Please check your configuration.";
        } else if (error.message.includes("Unauthorized")) {
          errorMessage =
            "Cloudinary authentication failed. Please check your API credentials.";
        } else if (error.message.includes("Forbidden")) {
          errorMessage =
            "Upload preset permissions denied. Please check your Cloudinary settings.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  // Filter themes based on search query
  const filteredThemes = allThemes.filter(
    (theme) =>
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get visible themes for pagination
  const visibleThemesList = filteredThemes.slice(0, visibleThemes);

  const handleScroll = (element: HTMLElement) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    setShowTopFade(!isAtTop);
    setShowBottomFade(!isAtBottom);
  };

  const loadMoreThemes = () => {
    setVisibleThemes((prev) => Math.min(prev + 6, filteredThemes.length));
    const desktopThemeList = document.getElementById(
      "desktop-theme-list"
    ) as HTMLElement;
    const mobileThemeList = document.getElementById(
      "mobile-theme-list"
    ) as HTMLElement;
    setTimeout(() => {
      if (desktopThemeList) {
        desktopThemeList.scrollTo({
          top: desktopThemeList.scrollHeight,
          behavior: "smooth",
        });
      }
      if (mobileThemeList) {
        mobileThemeList.scrollTo({
          top: mobileThemeList.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  };

  return (
    <>
      {/* Desktop Modal */}
      <div className="fixed inset-0 z-[99998] hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bg-black/50 w-screen h-screen"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                {createThemeData.id
                  ? "Edit Theme Experience"
                  : "Create Theme Experience"}
              </h3>
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Step Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step <= createThemeStep
                          ? "bg-primary text-white dark:text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-24 h-1 mx-2 transition-all duration-300 ${
                          step < createThemeStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Step {createThemeStep} of 3
                </h4>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={createThemeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {createThemeStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Theme Name
                      </label>
                      <input
                        type="text"
                        value={createThemeData.name}
                        onChange={(e) =>
                          updateCreateThemeData("name", e.target.value)
                        }
                        placeholder="Enter theme name..."
                        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        value={createThemeData.description}
                        onChange={(e) =>
                          updateCreateThemeData("description", e.target.value)
                        }
                        placeholder="Describe your theme experience..."
                        rows={3}
                        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                      />
                    </div>
                  </div>
                )}

                {createThemeStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Color Scheme
                      </label>

                      {/* Search Input */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search themes..."
                          className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                        />
                      </div>

                      <div className="relative">
                        <div
                          id="desktop-theme-list"
                          className="grid grid-cols-3 p-1 gap-3 overflow-y-auto max-h-[253px] scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                          onScroll={(e) => handleScroll(e.currentTarget)}
                        >
                          {visibleThemesList.map((scheme) => (
                            <motion.button
                              key={scheme.name}
                              onClick={() =>
                                updateCreateThemeData(
                                  "colorScheme",
                                  `${scheme.emoji} ${scheme.name}`
                                )
                              }
                              className={`p-3 rounded-lg border transition-all duration-200 ${
                                createThemeData.colorScheme ===
                                `${scheme.emoji} ${scheme.name}`
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/50"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex flex-col items-center space-y-1">
                                <span className="text-lg">{scheme.emoji}</span>
                                <span className="text-xs capitalize">
                                  {scheme.desc}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {/* Fade overlay for desktop */}
                        {showTopFade && (
                          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none z-10 transition-opacity duration-200"></div>
                        )}
                        {showBottomFade && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none z-10 transition-opacity duration-200"></div>
                        )}
                      </div>

                      {/* Load More Button */}
                      {visibleThemes < filteredThemes.length && (
                        <div className="flex justify-center mt-4">
                          <motion.button
                            onClick={loadMoreThemes}
                            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Load More ({filteredThemes.length - visibleThemes}{" "}
                            remaining)
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tags
                      </label>
                      <div className="space-y-3">
                        <div className="flex gap-2 flex-wrap">
                          {createThemeData.tags?.map((tag, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="text-primary hover:text-primary/70"
                              >
                                ×
                              </button>
                            </motion.span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a tag..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addTag(e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                          />
                          <button
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              addTag(input.value);
                              input.value = "";
                            }}
                            className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm dark:text-black"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {createThemeStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <p className="mb-2">Audio File</p>

                        {!createThemeData.src ? (
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={(e) => handleAudioFileChange(e)}
                              className="hidden"
                              id="audio-file-input"
                            />
                            <div className="space-y-2">
                              {isCompressing ? (
                                <>
                                  <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                  <p className="text-sm text-primary">
                                    Uploading and compressing...
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Please wait while we process your file
                                  </p>
                                </>
                              ) : (
                                <>
                                  <AudioWaveform className="w-8 h-8 mx-auto text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload audio file or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    MP3, WAV up to 20MB
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                            <button
                              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-background/80 hover:bg-background"
                              onClick={() => {
                                // Remove from sessionStorage if it's a session reference
                                if (
                                  createThemeData.src?.startsWith("session:")
                                ) {
                                  const audioId = createThemeData.src.replace(
                                    "session:",
                                    ""
                                  );
                                  sessionStorage.removeItem(`audio-${audioId}`);
                                }
                                updateCreateThemeData("src", "");
                              }}
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <AudioWaveform className="w-8 h-8 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {createThemeData.colorScheme.split(" ")[0]}{" "}
                              {createThemeData.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Audio file uploaded
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">
                        Theme Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>{" "}
                          {createThemeData.name || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Color Scheme:
                          </span>{" "}
                          {createThemeData.colorScheme || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tags:</span>{" "}
                          {createThemeData.tags?.length! > 0
                            ? createThemeData.tags?.join(", ")
                            : "None"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex space-x-3 pt-4">
              {createThemeStep > 1 && (
                <motion.button
                  onClick={prevStep}
                  className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}

              {createThemeStep < 3 ? (
                <motion.button
                  onClick={nextStep}
                  className="flex-1 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors dark:text-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  disabled={
                    !createThemeData.name || !createThemeData.colorScheme
                  }
                  onClick={handleTheme}
                  className={`flex-1 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors dark:text-black ${
                    !createThemeData.name || !createThemeData.colorScheme
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {createThemeData.id ? "Update Theme" : "Create Theme"}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Drawer - Portal */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <div className="fixed inset-0 z-[99999] md:hidden">
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/50"
                  onClick={handleClose}
                />
                <motion.div
                  id="create-theme-drawer"
                  key="drawer"
                  initial={{ y: "100vh" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100vh" }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                    exit: {
                      type: "tween",
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute bottom-0 left-0 right-0 w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-background border-t border-border rounded-t-3xl shadow-2xl">
                    {/* Drawer Handle */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-6 pb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-foreground">
                          {createThemeData.id
                            ? "Edit Theme Experience"
                            : "Create Theme Experience"}
                        </h3>
                        <motion.button
                          onClick={handleClose}
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Step Progress */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                                  step <= createThemeStep
                                    ? "bg-primary text-white dark:text-black"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {step}
                              </div>
                              {step < 3 && (
                                <div
                                  className={`w-16 h-1 mx-1 transition-all duration-300 ${
                                    step < createThemeStep
                                      ? "bg-primary"
                                      : "bg-muted"
                                  }`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <h4 className="text-xs font-medium text-muted-foreground">
                            Step {createThemeStep} of 3
                          </h4>
                        </div>
                      </div>

                      {/* Step Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={createThemeStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {createThemeStep === 1 && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Theme Name
                                </label>
                                <input
                                  type="text"
                                  value={createThemeData.name}
                                  onChange={(e) =>
                                    updateCreateThemeData(
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter theme name..."
                                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Description
                                </label>
                                <textarea
                                  value={createThemeData.description}
                                  onChange={(e) =>
                                    updateCreateThemeData(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Describe your theme experience..."
                                  rows={3}
                                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                                />
                              </div>
                            </div>
                          )}

                          {createThemeStep === 2 && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Color Scheme
                                </label>

                                {/* Search Input */}
                                <div className="relative mb-4">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search themes..."
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                                  />
                                </div>

                                <div className="relative">
                                  <div
                                    id="mobile-theme-list"
                                    className="grid grid-cols-3 p-1 gap-2 overflow-y-auto max-h-[198px] scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                                    onScroll={(e) =>
                                      handleScroll(e.currentTarget)
                                    }
                                  >
                                    {visibleThemesList.map((scheme) => (
                                      <motion.button
                                        key={scheme.name}
                                        onClick={() =>
                                          updateCreateThemeData(
                                            "colorScheme",
                                            `${scheme.emoji} ${scheme.name}`
                                          )
                                        }
                                        className={`p-2 rounded-lg border transition-all duration-200 ${
                                          createThemeData.colorScheme ===
                                          `${scheme.emoji} ${scheme.name}`
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border hover:border-primary/50"
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <div className="flex flex-col items-center space-y-1">
                                          <span className="text-sm">
                                            {scheme.emoji}
                                          </span>
                                          <span className="text-xs capitalize">
                                            {scheme.desc}
                                          </span>
                                        </div>
                                      </motion.button>
                                    ))}
                                  </div>
                                  {/* Fade overlay for mobile */}
                                  {showTopFade && (
                                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent pointer-events-none z-10 transition-opacity duration-200"></div>
                                  )}
                                  {showBottomFade && (
                                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none z-10 transition-opacity duration-200"></div>
                                  )}
                                </div>

                                {/* Load More Button */}
                                {visibleThemes < filteredThemes.length && (
                                  <div className="flex justify-center mt-4">
                                    <motion.button
                                      onClick={loadMoreThemes}
                                      className="px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Load More (
                                      {filteredThemes.length - visibleThemes}{" "}
                                      remaining)
                                    </motion.button>
                                  </div>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Tags
                                </label>
                                <div className="space-y-3">
                                  <div className="flex gap-2 flex-wrap">
                                    {createThemeData.tags?.map((tag, index) => (
                                      <motion.span
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center gap-1"
                                      >
                                        {tag}
                                        <button
                                          onClick={() => removeTag(tag)}
                                          className="text-primary hover:text-primary/70"
                                        >
                                          ×
                                        </button>
                                      </motion.span>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Add a tag..."
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          addTag(e.currentTarget.value);
                                          e.currentTarget.value = "";
                                        }
                                      }}
                                      className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                                    />
                                    <button
                                      onClick={(e) => {
                                        const input = e.currentTarget
                                          .previousElementSibling as HTMLInputElement;
                                        addTag(input.value);
                                        input.value = "";
                                      }}
                                      className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm dark:text-black"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {createThemeStep === 3 && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  <p className="mb-2">Audio File</p>

                                  {!createThemeData.src ? (
                                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                      <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) =>
                                          handleAudioFileChange(e)
                                        }
                                        className="hidden"
                                        id="audio-file-input"
                                      />
                                      <div className="space-y-2">
                                        {isCompressing ? (
                                          <>
                                            <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            <p className="text-sm text-primary">
                                              Uploading and compressing...
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              Please wait while we process your
                                              file
                                            </p>
                                          </>
                                        ) : (
                                          <>
                                            <AudioWaveform className="w-8 h-8 mx-auto text-muted-foreground" />
                                            <p className="text-xs text-muted-foreground">
                                              Click to upload audio file or drag
                                              and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              MP3, WAV up to 20MB
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                                      <button
                                        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-background/80 hover:bg-background"
                                        onClick={() => {
                                          // Remove from sessionStorage if it's a session reference
                                          if (
                                            createThemeData.src?.startsWith(
                                              "session:"
                                            )
                                          ) {
                                            const audioId =
                                              createThemeData.src.replace(
                                                "session:",
                                                ""
                                              );
                                            sessionStorage.removeItem(
                                              `audio-${audioId}`
                                            );
                                          }
                                          updateCreateThemeData("src", "");
                                        }}
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                      <AudioWaveform className="w-8 h-8 mx-auto text-muted-foreground" />
                                      <p className="text-sm text-muted-foreground">
                                        {
                                          createThemeData.colorScheme.split(
                                            " "
                                          )[0]
                                        }{" "}
                                        {createThemeData.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Audio file uploaded
                                      </p>
                                    </div>
                                  )}
                                </label>
                              </div>

                              <div className="bg-muted/50 rounded-lg p-3">
                                <h4 className="font-medium text-foreground mb-2 text-sm">
                                  Theme Summary
                                </h4>
                                <div className="space-y-1 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Name:
                                    </span>{" "}
                                    {createThemeData.name || "Not set"}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Color Scheme:
                                    </span>{" "}
                                    {createThemeData.colorScheme || "Not set"}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Tags:
                                    </span>{" "}
                                    {createThemeData.tags?.length! > 0
                                      ? createThemeData.tags?.join(", ")
                                      : "None"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex space-x-3 pt-4">
                        {createThemeStep > 1 && (
                          <motion.button
                            onClick={prevStep}
                            className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Previous
                          </motion.button>
                        )}

                        {createThemeStep < 3 ? (
                          <motion.button
                            onClick={nextStep}
                            className="flex-1 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors dark:text-black"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Next
                          </motion.button>
                        ) : (
                          <motion.button
                            disabled={
                              !createThemeData.name ||
                              !createThemeData.colorScheme
                            }
                            onClick={handleTheme}
                            className={`flex-1 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors dark:text-black ${
                              !createThemeData.name ||
                              !createThemeData.colorScheme
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {createThemeData.id
                              ? "Update Theme"
                              : "Create Theme"}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
