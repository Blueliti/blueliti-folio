import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const VideoBackground = ({ 
  videoSrc = null, 
  posterSrc = null, 
  className = "",
  showControls = true,
  autoPlay = true,
  muted = true,
  loop = true 
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video && autoPlay) {
      video.play().catch(console.error)
    }
  }, [autoPlay])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  // Si aucune vidéo n'est fournie, afficher un placeholder
  if (!videoSrc) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 ${className}`}>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Effet de particules animées pour simuler une vidéo */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-800/50 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Play size={48} className="text-gray-500" />
            </div>
            <p className="text-lg font-medium">Vidéo de fond MP4</p>
            <p className="text-sm opacity-75">Placeholder - Remplacer par votre vidéo</p>
          </div>
        </div>

        {showControls && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={() => {}}
            >
              <Play size={16} />
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        poster={posterSrc}
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contrôles vidéo personnalisés */}
      {showControls && isLoaded && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
        </div>
      )}

      {/* Indicateur de chargement */}
      {!isLoaded && videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            <p>Chargement de la vidéo...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoBackground

