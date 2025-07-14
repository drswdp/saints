import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const initialTarotDeck = [
  { id: 1, name: "Saint Aquinas", image: "/Aquinas.png", invocation: "New beginnings", breathPrayer: "Inhale: I trust. Exhale: I step forward.", bio: "Saint Thomas Aquinas, a 13th-century theologian, is known for his works like the Summa Theologica, blending faith and reason. His teachings guide spiritual seekers to trust in divine wisdom." },
  { id: 2, name: "Saint Catherine", image: "/Catherine.png", invocation: "Manifestation", breathPrayer: "Inhale: I create. Exhale: I act.", bio: "Saint Catherine of Siena, a mystic and doctor of the Church, inspired action through her visions and letters, urging believers to manifest God’s will with courage." },
  { id: 3, name: "Faustina", image: "/Faustina.png", invocation: "Intuition", breathPrayer: "Inhale: I listen. Exhale: I know.", bio: "Saint Faustina Kowalska, apostle of Divine Mercy, shared visions of Jesus, teaching trust in God’s mercy and the power of intuitive faith." },
  { id: 4, name: "Saint Bruno", image: "/Bruno.png", invocation: "Abundance", breathPrayer: "Inhale: I nurture. Exhale: I grow.", bio: "Saint Bruno, founder of the Carthusian Order, embraced solitude and prayer, nurturing spiritual growth and abundant faith in silence." },
  { id: 5, name: "Alphonsus", image: "/Alphonsus.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Alphonsus Liguori, a moral theologian, founded the Redemptorists, leading with authority grounded in compassion and steadfast faith." },
  { id: 6, name: "Gabriel the Archangel", image: "/Gabriel.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Gabriel, the messenger angel, delivered divine announcements, symbolizing authority through clear, unwavering communication of God’s will." },
  { id: 7, name: "Andrew", image: "/Andrew.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Andrew, the apostle, was a fisherman called by Jesus, leading others to faith with steadfast commitment." },
  { id: 8, name: "Saint Augustine", image: "/Augustine.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Augustine, a convert and bishop, wrote Confessions, guiding souls with his authoritative insights on grace and redemption." },
  { id: 10, name: "Saint Benedict", image: "/Benedict.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Benedict, father of Western monasticism, established the Rule, leading communities with discipline and spiritual authority." },
  { id: 11, name: "Saint Dismas", image: "/Dismas.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Dismas, the repentant thief, found salvation on the cross, exemplifying authority through humble acceptance of grace." },
  { id: 12, name: "Saint Francis", image: "/Francis.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Francis of Assisi, founder of the Franciscans, led with simplicity and love for creation, inspiring steadfast devotion." },
  { id: 13, name: "Our Lady", image: "/OurLady.png", invocation: "Mother of God, bring us to your Son.", breathPrayer: "Inhale: Mary full of grace... Hold: Seat of Wisdom Exhale: Lead us to Jesus.", bio: "Our Lady, the Virgin Mary, mother of Jesus, leads with maternal authority, guiding believers to her Son." },
  { id: 14, name: "Saint Mary Magdalene", image: "/Mary.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Mary Magdalene, disciple of Jesus, bore witness to the Resurrection, leading with unwavering faith." },
  { id: 15, name: "Saint Ignatius", image: "/Ignatius.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Ignatius of Loyola, founder of the Jesuits, led with spiritual exercises, fostering disciplined faith." },
  { id: 16, name: "Saint Isaac", image: "/Isaac.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Isaac Jogues, a missionary martyr, led with courage among the Native Americans, standing firm in faith." },
  { id: 17, name: "Saint John", image: "/John.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint John the Apostle, beloved disciple, led with love and authored the Gospel, guiding souls to truth." },
  { id: 18, name: "Saint Jude", image: "/Jude.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Jude Thaddeus, patron of hopeless causes, led with hope, inspiring steadfast prayer." },
  { id: 19, name: "Saint Juliana", image: "/Juliana.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Juliana of Liège, promoter of the Feast of Corpus Christi, led with devotion to the Eucharist." },
  { id: 20, name: "Saint Longinus", image: "/Longinus.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Longinus, the soldier who pierced Jesus’ side, converted and led others to faith." },
  { id: 21, name: "Michael the Archangel", image: "/Michael.png", invocation: "Saint Michael the Archangel, defend us in battle.", breathPrayer: "Inhale: By God's power... Hold: Stand guard with your sword Exhale: Strike down the Enemy.", bio: "Michael the Archangel, defender against evil, leads with divine authority and protection." },
  { id: 22, name: "Saint Montfort", image: "/Montfort.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Louis de Montfort, promoter of Marian devotion, led with zeal for true devotion." },
  { id: 23, name: "Saint Moses the Black", image: "/Moses.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Moses the Black, a converted robber, led monastic communities with repentance and strength." },
  { id: 24, name: "Saint Padre Pio", image: "/Padre.png", invocation: "Padre Pio, spiritual warrior, intercede for us.", breathPrayer: "Inhale: Let me suffer with Christ... Hold: Only if it brings Him glory Exhale: Make me a weapon for souls.", bio: "Saint Padre Pio, a stigmatist, led with mystical gifts, guiding souls through confession." },
  { id: 25, name: "Saint Paul", image: "/Paul.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Paul, apostle to the Gentiles, led with bold preaching, spreading Christianity widely." },
  { id: 26, name: "Saint Raphael", image: "/Raphael.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Raphael the Archangel, healer and guide, led Tobias with divine authority." },
  { id: 27, name: "Saint Simon", image: "/Simon.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Simon the Zealot, apostle, led with fervent faith, spreading the Gospel." },
  { id: 28, name: "Saint Teresa", image: "/Teresa.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Teresa of Ávila, mystic and reformer, led with spiritual authority in the Carmelite Order." },
  { id: 29, name: "Saint John", image: "/Vianney.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint John Vianney, patron of priests, led with humble authority through tireless ministry." },
  { id: 30, name: "Saint Vilana", image: "/Vilana.png", invocation: "Authority", breathPrayer: "Inhale: I lead. Exhale: I stand firm.", bio: "Saint Vilana, a Dominican tertiary, led with quiet faith and charity." },
];

const jesusCard = { id: 0, name: "Jesus", image: "/Jesus.png", invocation: "Jesus, have mercy on me.", breathPrayer: "Inhale: You are Lord... Hold: My Shepherd Exhale: Heal me Guide me.", bio: "Jesus Christ, the Son of God, guides humanity with divine love and wisdom, leading all to salvation through His teachings and sacrifice." };

function App() {
  const [cards, setCards] = useState([{ ...jesusCard, isFlipped: true, position: "center" }]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardAnimation, setSelectedCardAnimation] = useState(null);
  const [tarotDeck, setTarotDeck] = useState(initialTarotDeck);

  const clearBoard = () => {
    setCards([{ ...jesusCard, isFlipped: true, position: "center" }]);
    setShowDeck(false);
    setSelectedCard(null);
    setSelectedCardAnimation(null);
    setTarotDeck(initialTarotDeck); // Reset deck to initial state
  };

  const shuffleCards = () => {
    setIsShuffling(true);
    setShowDeck(false);
    setSelectedCard(null);
    setSelectedCardAnimation(null);
    setTimeout(() => {
      setIsShuffling(false);
      setShowDeck(true); // Show full deck after shuffle
    }, 1500);
  };

  const selectCardFromDeck = (card) => {
    if (card.id === jesusCard.id) return; // Prevent selecting Jesus card
    if (cards.filter(c => c.position !== "center").length < 5) {
      const targetPosition = getNextPosition(cards);
      setSelectedCardAnimation({ card, from: { x: 0, y: 0 }, to: getPositionStyle(targetPosition) });
      setTimeout(() => {
        setCards([...cards, { ...card, isFlipped: true, position: targetPosition }]);
        setTarotDeck(tarotDeck.filter(c => c.id !== card.id)); // Remove selected card
        if (cards.filter(c => c.position !== "center").length === 4) {
          setShowDeck(false);
        }
        setSelectedCardAnimation(null);
      }, 500);
    }
  };

  const getNextPosition = (currentCards) => {
    const filledPositions = currentCards.map(c => c.position);
    const positions = ["below", "left", "above", "right", "bottom"];
    return positions.find(p => !filledPositions.includes(p)) || "below";
  };

  const getPositionStyle = (position) => {
    const positions = {
      center: { left: "125px", top: "150px" },
      below: { left: "125px", top: "310px" },
      left: { left: "15px", top: "150px" },
      above: { left: "125px", top: "0px" },
      right: { left: "235px", top: "150px" },
      bottom: { left: "125px", top: "490px" },
    };
    return positions[position] || positions["below"];
  };

  const flipCard = (card) => {
    setSelectedCard(selectedCard?.id === card.id ? null : card);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Garamond" }}>
      <h1>Saints for Sinners</h1>
      <button
        onClick={shuffleCards}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
        disabled={isShuffling}
      >
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>
      <button
        onClick={clearBoard}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "#FF5733",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
          marginLeft: "10px",
        }}
        disabled={isShuffling}
      >
        Clear Board
      </button>

      {isShuffling && (
        <motion.div
          animate={{
            y: [0, -20, 20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ repeat: 3, duration: 0.5 }}
          style={{ margin: "0 auto", width: "100px", height: "150px" }}
        >
          <img src="/card-back.png" alt="Deck" style={{ width: "100%", height: "100%" }} />
        </motion.div>
      )}

      {!isShuffling && (
        <div style={{ position: "relative", width: "350px", height: "650px", margin: "0 auto", background: "#f0f0f0" }}>
          {/* Empty placeholders for card positions */}
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "125px", top: "150px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "125px", top: "310px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "15px", top: "150px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "125px", top: "0px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "235px", top: "150px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          <div style={{ position: "absolute", width: "100px", height: "150px", left: "125px", top: "490px", border: "2px dashed #888", borderRadius: "5px" }}></div>
          {cards.map(card => (
            <motion.div
              key={card.id}
              onClick={() => flipCard(card)}
              animate={{ scale: selectedCard?.id === card.id ? 1.2 : 1 }}
              style={{
                width: "100px",
                height: "150px",
                position: "absolute",
                cursor: "pointer",
                ...(card.position === "center" && { left: "125px", top: "150px" }),
                ...(card.position === "below" && { left: "125px", top: "310px" }),
                ...(card.position === "left" && { left: "15px", top: "150px" }),
                ...(card.position === "above" && { left: "125px", top: "0px" }),
                ...(card.position === "right" && { left: "235px", top: "150px" }),
                ...(card.position === "bottom" && { left: "125px", top: "490px" }),
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                onError={() => console.log(`Failed to load image: ${card.image}`)}
              />
            </motion.div>
          ))}
          {selectedCardAnimation && (
            <motion.div
              key={selectedCardAnimation.card.id}
              initial={{ x: selectedCardAnimation.from.x + 300, y: selectedCardAnimation.from.y + 100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1, ...selectedCardAnimation.to }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                width: "100px",
                height: "150px",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={selectedCardAnimation.card.image}
                alt={selectedCardAnimation.card.name}
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              />
            </motion.div>
          )}
        </div>
      )}

      {selectedCard && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
          <img
            src={selectedCard.image}
            alt={selectedCard.name}
            style={{ width: "200px", height: "300px", borderRadius: "10px" }}
          />
          <div style={{ maxWidth: "300px", textAlign: "left" }}>
            <h3>{selectedCard.name}</h3>
            <p>{selectedCard.bio}</p>
          </div>
        </div>
      )}

      {cards.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Sanctified Rosary of Holy Breath</h3>
          <ul style={{ listStyleType: "disc", textAlign: "left", display: "inline-block" }}>
            <li key="jesus">{jesusCard.invocation}</li>
            {cards.map(card => (
              <li key={card.id}>{card.breathPrayer}</li>
            ))}
            <li key="bottom">{cards[5]?.invocation || ""}</li>
          </ul>
        </div>
      )}

      <div
        onClick={() => { setShowDeck(!showDeck); setSelectedCard(null); }}
        style={{
          cursor: "pointer",
          marginTop: "20px",
          width: "100px",
          height: "150px",
          display: "inline-block",
        }}
      >
        <img src="/card-back.png" alt="Deck" style={{ width: "100%", height: "100%" }} />
      </div>

      {showDeck && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: "relative", width: "800px", height: "200px", margin: "20px auto" }}
        >
          {tarotDeck.map((card, index) => {
            const angle = (index - (tarotDeck.length - 1) / 2) * 3;
            const xOffset = index * 60 - (tarotDeck.length * 30);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -20, scale: 1.1, zIndex: index + 10 }}
                style={{
                  width: "80px",
                  height: "120px",
                  position: "absolute",
                  left: "400px",
                  transform: `translateX(${xOffset}px) rotate(${angle}deg)`,
                  cursor: cards.filter(c => c.position !== "center").length < 5 ? "pointer" : "default",
                  zIndex: index,
                }}
                onClick={() => selectCardFromDeck(card)}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                  onError={() => console.log(`Failed to load image: ${card.image}`)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default App;
