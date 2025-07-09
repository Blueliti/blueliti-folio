import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Menu, X, Play, Pause, ChevronDown, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react'
import VideoBackground from './components/VideoBackground.jsx'
import { FadeInOnScroll, SlideInLeft, SlideInRight, ScaleOnScroll, CounterAnimation } from './components/ScrollAnimations.jsx'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  // Gestion du scroll pour la navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'gallery', 'services', 'blog', 'shop', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">ARTISTE 3D</div>
            
            {/* Navigation desktop */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Accueil' },
                { id: 'about', label: 'À propos' },
                { id: 'gallery', label: 'Galerie' },
                { id: 'services', label: 'Services' },
                { id: 'blog', label: 'Blog' },
                { id: 'shop', label: 'Boutique' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-gray-300 transition-colors ${
                    currentSection === item.id ? 'text-white border-b-2 border-white' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Menu mobile */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'hero', label: 'Accueil' },
                { id: 'about', label: 'À propos' },
                { id: 'gallery', label: 'Galerie' },
                { id: 'services', label: 'Services' },
                { id: 'blog', label: 'Blog' },
                { id: 'shop', label: 'Boutique' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block px-3 py-2 text-gray-300 hover:text-white w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Section Hero avec vidéo en arrière-plan */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground 
          className="absolute inset-0 w-full h-full"
          videoSrc={null} // Sera remplacé par la vraie vidéo MP4
          showControls={true}
          autoPlay={true}
          muted={true}
          loop={true}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              CRÉATIONS 3D
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                MODERNES
              </span>
            </h1>
          </FadeInOnScroll>
          
          <FadeInOnScroll delay={300}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Artiste 3D spécialisé dans les créations contemporaines et épurées
            </p>
          </FadeInOnScroll>
          
          <FadeInOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('gallery')}
              >
                Découvrir mes œuvres
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('contact')}
              >
                Me contacter
              </Button>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/60" />
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <div>
                <h2 className="text-4xl font-bold mb-6">À propos de moi</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Passionné par l'art numérique et les nouvelles technologies, je crée des œuvres 3D 
                  qui explorent les frontières entre réalité et imagination. Mon approche moderne et 
                  épurée reflète ma vision contemporaine de l'art digital.
                </p>
                <p className="text-gray-300 text-lg mb-8">
                  Avec plusieurs années d'expérience dans la modélisation 3D, l'animation et le rendu, 
                  je transforme des concepts abstraits en créations visuelles saisissantes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Blender', 'Cinema 4D', 'Maya', 'Substance Painter', 'Unreal Engine'].map((skill, index) => (
                    <FadeInOnScroll key={skill} delay={index * 100}>
                      <Badge variant="secondary" className="bg-gray-800 text-white">
                        {skill}
                      </Badge>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            </SlideInLeft>
            <SlideInRight>
              <div className="relative">
                {/* Placeholder pour photo de profil */}
                <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full"></div>
                    <p>Photo de profil</p>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section id="gallery" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Galerie d'œuvres</h2>
          
          {/* Grille de projets */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-video bg-gray-800 relative">
                  {/* Placeholder pour rendu 3D */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded"></div>
                      <p className="text-sm">Rendu 3D #{item}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Projet {item}</h3>
                  <p className="text-gray-400 mb-4">Description de l'œuvre 3D et des techniques utilisées.</p>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Modélisation 3D",
                description: "Création de modèles 3D détaillés pour vos projets artistiques ou commerciaux.",
                features: ["Modélisation organique", "Architecture 3D", "Objets techniques"]
              },
              {
                title: "Animation 3D",
                description: "Animations fluides et captivantes pour donner vie à vos créations.",
                features: ["Animation de personnages", "Motion design", "Effets visuels"]
              },
              {
                title: "Rendu & Post-production",
                description: "Rendus photoréalistes et post-production pour des résultats exceptionnels.",
                features: ["Éclairage avancé", "Matériaux réalistes", "Compositing"]
              }
            ].map((service, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-400 flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Blog */}
      <section id="blog" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Blog</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <Card key={post} className="bg-gray-900 border-gray-800">
                <div className="aspect-video bg-gray-800">
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded"></div>
                      <p className="text-sm">Image article #{post}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-gray-700 text-gray-300">Tutoriel</Badge>
                  <h3 className="text-xl font-semibold mb-2">Techniques avancées en 3D</h3>
                  <p className="text-gray-400 mb-4">Découvrez les dernières techniques pour créer des rendus photoréalistes...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>15 Jan 2025</span>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      Lire la suite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Boutique */}
      <section id="shop" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Boutique</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <Card key={product} className="bg-gray-800 border-gray-700">
                <div className="aspect-square bg-gray-700">
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-600 rounded"></div>
                      <p className="text-sm">Produit #{product}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Œuvre digitale #{product}</h3>
                  <p className="text-gray-400 text-sm mb-3">Print haute qualité disponible</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">€45</span>
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                      Acheter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Parlons de votre projet</h3>
              <p className="text-gray-300 mb-8">
                Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter 
                de vos besoins et voir comment nous pouvons collaborer.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span>contact@artiste3d.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Paris, France</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="flex space-x-4 mt-8">
                <Button variant="outline" size="icon" className="border-gray-600 hover:bg-gray-800">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 hover:bg-gray-800">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 hover:bg-gray-800">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <Input 
                      placeholder="Votre nom" 
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email" 
                      placeholder="votre@email.com" 
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <Input 
                    placeholder="Sujet de votre message" 
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Décrivez votre projet..." 
                    rows={6}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Artiste 3D. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

