
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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 80;
    this.isJumping = false;
    this.jumpHeight = 0;
  }

  jump(): Promise<void> {
    return new Promise((resolve) => {
      this.isJumping = true;
      let jumpProgress = 0;
      const jumpInterval = setInterval(() => {
        jumpProgress += 0.1;
        this.jumpHeight = Math.sin(jumpProgress * Math.PI) * 60;
        
        if (jumpProgress >= 1) {
          clearInterval(jumpInterval);
          this.isJumping = false;
          this.jumpHeight = 0;
          resolve();
        }
      }, 16);
    });
  }

  moveToX(targetX: number): Promise<void> {
    return new Promise((resolve) => {
      const startX = this.x;
      const distance = targetX - startX;
      let progress = 0;
      
      const moveInterval = setInterval(() => {
        progress += 0.05;
        this.x = startX + (distance * progress);
        
        if (progress >= 1) {
          clearInterval(moveInterval);
          this.x = targetX;
          resolve();
        }
      }, 16);
    });
  }
}

class QuestionBlock {
  x: number;
  y: number;
  letter: string;
  isBroken: boolean;
  isAnimating: boolean;

  constructor(x: number, y: number, letter: string) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.isBroken = false;
    this.isAnimating = false;
  }

  break(): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;
      setTimeout(() => {
        this.isBroken = true;
        this.isAnimating = false;
        resolve();
      }, 300);
    });
  }
}

class Coin {
  x: number;
  y: number;
  rotation: number;
  isVisible: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.isVisible = false;
  }

  animate(): Promise<void> {
    return new Promise((resolve) => {
      this.isVisible = true;
      let progress = 0;
      
      const animateInterval = setInterval(() => {
        progress += 0.05;
        this.y -= 2;
        this.rotation += 15;
        
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
    character: new GameCharacter(50, 300),
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

  useEffect(() => {
    // Show skip button after 4 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 4000);

    const startAnimation = async () => {
      const { character, blocks } = gameState;
      
      // Animation sequence
      for (let i = 0; i < blocks.length; i++) {
        setCurrentStep(i);
        
        // Move character to block
        await character.moveToX(blocks[i].x - 50);
        
        // Jump and break block
        const jumpPromise = character.jump();
        const breakPromise = blocks[i].break();
        
        await Promise.all([jumpPromise, breakPromise]);
        
        // Create and animate coin
        const coin = new Coin(blocks[i].x + 40, blocks[i].y);
       setGameState(prev => ({
  ...prev,
  coins: [...prev.coins, coin]
}));

        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Hide Mario and complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowMario(false);
      setTimeout(onComplete, 1000);
    };

    startAnimation();

    return () => {
      clearTimeout(skipTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShowMario(false);
    setTimeout(onComplete, 300);
  };

  const { character, blocks, coins } = gameState;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-400 via-sky-500 to-green-400 flex items-center justify-center z-50 overflow-hidden">
      {/* Skip button */}
      {showSkipButton && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 z-10"
        >
          Skip Animation
        </button>
      )}

      <div className="relative w-full max-w-6xl mx-auto px-8 h-96">
        {/* Character */}
        {showMario && (
          <div 
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${character.x}px`,
              bottom: `${100 + character.jumpHeight}px`,
              transform: character.isJumping ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div className="w-16 h-20 relative">
              {/* Hat */}
              <div className="absolute top-0 left-2 w-12 h-4 bg-red-600 rounded-t-lg shadow-sm"></div>
              {/* Face */}
              <div className="absolute top-3 left-1 w-14 h-8 bg-yellow-200 rounded-lg shadow-sm"></div>
              {/* Eyes */}
              <div className="absolute top-5 left-3 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-5 left-9 w-2 h-2 bg-black rounded-full"></div>
              {/* Mustache */}
              <div className="absolute top-7 left-4 w-6 h-2 bg-gray-800 rounded-full"></div>
              {/* Shirt */}
              <div className="absolute top-8 left-0 w-16 h-8 bg-blue-600 rounded shadow-sm"></div>
              {/* Overalls */}
              <div className="absolute top-12 left-2 w-12 h-6 bg-red-600 rounded shadow-sm"></div>
              {/* Legs */}
              <div className="absolute top-16 left-4 w-3 h-4 bg-blue-800 rounded"></div>
              <div className="absolute top-16 left-9 w-3 h-4 bg-blue-800 rounded"></div>
              {/* Shoes */}
              <div className="absolute top-19 left-3 w-4 h-2 bg-yellow-700 rounded"></div>
              <div className="absolute top-19 left-9 w-4 h-2 bg-yellow-700 rounded"></div>
            </div>
          </div>
        )}

        {/* Question Blocks */}
        {blocks.map((block, index) => (
          <div key={index} className="absolute" style={{ left: `${block.x}px`, top: `${block.y}px` }}>
            {!block.isBroken ? (
              <div 
                className={`w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-4 border-yellow-700 flex items-center justify-center text-2xl font-bold text-white relative shadow-lg
                  ${block.isAnimating ? 'animate-pulse scale-110' : ''}
                  ${index === currentStep ? 'animate-bounce' : ''}
                `}
                style={{
                  boxShadow: 'inset 0 0 0 2px #fbbf24, 0 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                <span className="text-yellow-100 font-bold text-3xl drop-shadow-lg">?</span>
                <span className="absolute inset-0 flex items-center justify-center text-yellow-100 font-bold text-xl opacity-60">
                  {block.letter}
                </span>
              </div>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center">
                <span className="text-6xl font-bold text-neon-gold animate-bounce drop-shadow-2xl">
                  {block.letter}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Coins */}
        {coins.map((coin, index) => (
          coin.isVisible && (
            <div 
              key={index}
              className="absolute w-8 h-8"
              style={{ 
                left: `${coin.x}px`, 
                top: `${coin.y}px`,
                transform: `rotate(${coin.rotation}deg)`
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-neon-gold to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900 shadow-lg border-2 border-yellow-600">
                $
              </div>
            </div>
          )
        ))}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 via-green-500 to-green-400 shadow-inner"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-16 h-8 bg-white rounded-full opacity-80 shadow-sm animate-float"></div>
        <div className="absolute top-20 right-20 w-20 h-10 bg-white rounded-full opacity-80 shadow-sm animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-16 left-1/3 w-12 h-6 bg-white rounded-full opacity-80 shadow-sm animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Hills */}
        <div className="absolute bottom-20 left-20 w-32 h-16 bg-green-500 rounded-t-full opacity-70"></div>
        <div className="absolute bottom-20 right-32 w-24 h-12 bg-green-500 rounded-t-full opacity-70"></div>
      </div>
    </div>
  );
};

export default MarioAnimation;
