
import React, { useState, useEffect, useRef } from 'react';

interface MarioAnimationProps {
  onComplete: () => void;
}

class GameCharacter {
  x: number;
  y: number;
  width: number;
  height: number;
  isJumping: boolean;
  jumpHeight: number;
  velocity: { x: number; y: number };

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 64;
    this.isJumping = false;
    this.jumpHeight = 0;
    this.velocity = { x: 0, y: 0 };
  }

  async jump(): Promise<void> {
    return new Promise((resolve) => {
      this.isJumping = true;
      let jumpProgress = 0;
      const jumpInterval = setInterval(() => {
        jumpProgress += 0.08;
        this.jumpHeight = Math.sin(jumpProgress * Math.PI) * 80;
        
        if (jumpProgress >= 1) {
          clearInterval(jumpInterval);
          this.isJumping = false;
          this.jumpHeight = 0;
          resolve();
        }
      }, 16);
    });
  }

  async moveToX(targetX: number): Promise<void> {
    return new Promise((resolve) => {
      const startX = this.x;
      const distance = targetX - startX;
      let progress = 0;
      
      const moveInterval = setInterval(() => {
        progress += 0.03;
        this.x = startX + (distance * this.easeInOutQuad(progress));
        
        if (progress >= 1) {
          clearInterval(moveInterval);
          this.x = targetX;
          resolve();
        }
      }, 16);
    });
  }

  easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}

class QuestionBlock {
  x: number;
  y: number;
  letter: string;
  isBroken: boolean;
  isAnimating: boolean;
  particles: { x: number; y: number; vx: number; vy: number; life: number }[];

  constructor(x: number, y: number, letter: string) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.isBroken = false;
    this.isAnimating = false;
    this.particles = [];
  }

  async break(): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;
      
      // Create break particles
      for (let i = 0; i < 6; i++) {
        this.particles.push({
          x: this.x + 40,
          y: this.y + 40,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * -8 - 2,
          life: 1
        });
      }
      
      setTimeout(() => {
        this.isBroken = true;
        this.isAnimating = false;
        resolve();
      }, 400);
    });
  }
}

class Coin {
  x: number;
  y: number;
  rotation: number;
  isVisible: boolean;
  opacity: number;
  scale: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.opacity = 1;
    this.scale = 1;
    this.isVisible = false;
  }

  async animate(): Promise<void> {
    return new Promise((resolve) => {
      this.isVisible = true;
      let progress = 0;
      
      const animateInterval = setInterval(() => {
        progress += 0.04;
        this.y -= 3;
        this.rotation += 12;
        this.opacity = 1 - progress;
        this.scale = 1 + progress * 0.5;
        
        if (progress >= 1) {
          clearInterval(animateInterval);
          resolve();
        }
      }, 16);
    });
  }
}

const MarioAnimation: React.FC<MarioAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showMario, setShowMario] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [gameState, setGameState] = useState({
    character: new GameCharacter(50, 320),
    blocks: [
      new QuestionBlock(200, 250, 'D'),
      new QuestionBlock(320, 250, 'I'),
      new QuestionBlock(440, 250, 'G'),
      new QuestionBlock(560, 250, 'A'),
      new QuestionBlock(680, 250, 'O')
    ],
    coins: [] as Coin[]
  });

  const animationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    const startAnimation = async () => {
      const { character, blocks } = gameState;
      
      try {
        for (let i = 0; i < blocks.length; i++) {
          setCurrentStep(i);
          
          // Move character to block
          await character.moveToX(blocks[i].x - 60);
          
          // Jump and break block simultaneously
          const jumpPromise = character.jump();
          const breakPromise = blocks[i].break();
          
          await Promise.all([jumpPromise, breakPromise]);
          
          // Create and animate coin
          const coin = new Coin(blocks[i].x + 32, blocks[i].y - 20);
          setGameState(prev => ({
            ...prev,
            coins: [...prev.coins, coin]
          }));
          
          coin.animate();
          
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Wait and complete
        await new Promise(resolve => setTimeout(resolve, 1500));
        setShowMario(false);
        
        timeoutRef.current = setTimeout(() => {
          onComplete();
        }, 800);
        
      } catch (error) {
        console.error('Animation error:', error);
        onComplete();
      }
    };

    startAnimation();

    return () => {
      clearTimeout(skipTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShowMario(false);
    setTimeout(onComplete, 200);
  };

  const { character, blocks, coins } = gameState;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-400 via-sky-500 to-green-400 flex items-center justify-center z-50 overflow-hidden">
      {/* Skip button */}
      {showSkipButton && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 z-10 border border-white/30"
        >
          Pular Animação
        </button>
      )}

      <div className="relative w-full max-w-6xl mx-auto px-8 h-96">
        {/* Character Mario */}
        {showMario && (
          <div 
            className="absolute transition-all duration-300 ease-out z-20"
            style={{
              left: `${character.x}px`,
              bottom: `${100 + character.jumpHeight}px`,
              transform: character.isJumping ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div className="w-12 h-16 relative">
              {/* Hat */}
              <div className="absolute top-0 left-1 w-10 h-3 bg-red-600 rounded-t-lg"></div>
              {/* Face */}
              <div className="absolute top-2 left-0 w-12 h-6 bg-yellow-200 rounded-lg"></div>
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
              <div className="absolute top-3 left-8 w-1.5 h-1.5 bg-black rounded-full"></div>
              {/* Mustache */}
              <div className="absolute top-5 left-3 w-6 h-1.5 bg-gray-800 rounded-full"></div>
              {/* Body */}
              <div className="absolute top-6 left-0 w-12 h-6 bg-blue-600 rounded"></div>
              {/* Overalls */}
              <div className="absolute top-8 left-2 w-8 h-4 bg-red-600 rounded"></div>
              {/* Legs */}
              <div className="absolute top-11 left-3 w-2 h-3 bg-blue-800 rounded"></div>
              <div className="absolute top-11 left-7 w-2 h-3 bg-blue-800 rounded"></div>
              {/* Shoes */}
              <div className="absolute top-13 left-2 w-3 h-1.5 bg-yellow-700 rounded"></div>
              <div className="absolute top-13 left-7 w-3 h-1.5 bg-yellow-700 rounded"></div>
            </div>
          </div>
        )}

        {/* Question Blocks */}
        {blocks.map((block, index) => (
          <div key={index} className="absolute z-10" style={{ left: `${block.x}px`, top: `${block.y}px` }}>
            {!block.isBroken ? (
              <div 
                className={`w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-4 border-yellow-700 flex items-center justify-center text-2xl font-bold text-white relative shadow-lg transition-all duration-300
                  ${block.isAnimating ? 'animate-pulse scale-110' : ''}
                  ${index === currentStep ? 'animate-bounce shadow-2xl' : ''}
                `}
                style={{
                  boxShadow: 'inset 0 0 0 2px #fbbf24, 0 4px 12px rgba(0,0,0,0.4)'
                }}
              >
                <span className="text-yellow-100 font-bold text-4xl drop-shadow-lg">?</span>
              </div>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center">
                <span className="text-7xl font-bold text-white animate-bounce drop-shadow-2xl glow-text">
                  {block.letter}
                </span>
              </div>
            )}

            {/* Break particles */}
            {block.particles.map((particle, particleIndex) => (
              <div
                key={particleIndex}
                className="absolute w-2 h-2 bg-yellow-600 rounded"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  opacity: particle.life
                }}
              />
            ))}
          </div>
        ))}

        {/* Coins */}
        {coins.map((coin, index) => (
          coin.isVisible && (
            <div 
              key={index}
              className="absolute w-8 h-8 z-30"
              style={{ 
                left: `${coin.x}px`, 
                top: `${coin.y}px`,
                transform: `rotate(${coin.rotation}deg) scale(${coin.scale})`,
                opacity: coin.opacity
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-sm font-bold text-yellow-900 shadow-lg border-2 border-yellow-500">
                $
              </div>
            </div>
          )
        ))}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 via-green-500 to-green-400 shadow-inner z-0"></div>
        
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-16 h-8 bg-white rounded-full opacity-80 shadow-sm animate-pulse"></div>
        <div className="absolute top-20 right-20 w-20 h-10 bg-white rounded-full opacity-80 shadow-sm animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-16 left-1/3 w-12 h-6 bg-white rounded-full opacity-80 shadow-sm animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Hills */}
        <div className="absolute bottom-20 left-20 w-32 h-16 bg-green-500 rounded-t-full opacity-70 z-5"></div>
        <div className="absolute bottom-20 right-32 w-24 h-12 bg-green-500 rounded-t-full opacity-70 z-5"></div>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
        }
      `}</style>
    </div>
  );
};

export default MarioAnimation;
