import "../styles/home.css"
import i7 from "../assets/i7.png"
import i8 from "../assets/i8.png"
import i9 from "../assets/i9.png"
import i10 from "../assets/i10.png"
import HeroSection from "../components/HeroSection"
import TrendingProducts from "../components/TrendingProducts"
import FeaturedCategories from "../components/FeaturedCartegories"
import CraftlyAims from "../components/CraftlyAims"
import CommunityStats from "../components/CommunityStats"
import FeaturedArtisans from "../components/FeaturedArtisan" // Import the new component

const HomePage = () => {
  // Sample data for featured creators
  const featuredArtisan = [
    {
      id: 1,
      name: "Bowen Grey",
      specialty: "Furniture Maker",
      image: i7,
      rating: 5,
      reviews: 520,
      bio: "I design and create functional and aesthetic furniture handcrafted to last for generations.",
    },
    {
      id: 2,
      name: "Chioma Clinton",
      specialty: "Fashion Stylist",
      image: i8,
      rating: 5,
      reviews: 450,
      bio: "I design and create functional and aesthetic furniture handcrafted to last for generations.",
    },
    {
      id: 3,
      name: "Amos Okon",
      specialty: "Cutlery",
      image: i9,
      rating: 5,
      reviews: 480,
      bio: "I design and create functional and aesthetic furniture handcrafted to last for generations.",
    },
    {
      id: 4,
      name: "Oyinda Lawal",
      specialty: "Bag Maker",
      image: i10,
      rating: 5,
      reviews: 500,
      bio: "I design and create functional and aesthetic furniture handcrafted to last for generations.",
    },
  ]

  return (
    <div className="home-page">
      <HeroSection />
      <CraftlyAims />
      <FeaturedCategories />
      <TrendingProducts />
      <FeaturedArtisans artisans={featuredArtisan} />
      <CommunityStats />
    </div>
  )
}

export default HomePage

