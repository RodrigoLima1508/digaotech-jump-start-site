
import React, { useState, useEffect } from 'react';

interface MarioAnimationProps {
  onComplete: () => void;
}

const MarioAnimation: React.FC<MarioAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMario, setShowMario] = useState(true);
  const letters = ['D', 'I', 'G', 'A', 'O'];
  const [brokenBlocks, setBrokenBlocks] = useState<boolean[]>(new Array(5).fill(false));
  const [coins, setCoins] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    const animationSequence = async () => {
      // Mario walks in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Jump on each block
      for (let i = 0; i < 5; i++) {
        setCurrentStep(i);
        
        // Mario jumps
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Block breaks and coin appears
        setBrokenBlocks(prev => {
          const newBroken = [...prev];
          newBroken[i] = true;
          return newBroken;
        });
        
        setCoins(prev => {
          const newCoins = [...prev];
          newCoins[i] = true;
          return newCoins;
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Hide Mario and show Digaotech logo
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowMario(false);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    };

    animationSequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-auto px-8">
        {/* Mario character */}
        {showMario && (
          <div 
            className={`absolute bottom-32 transition-all duration-800 ${
              currentStep >= 0 ? 'left-16' : '-left-20'
            } ${currentStep >= 0 ? 'animate-mario-walk' : ''}`}
            style={{
              transform: currentStep > 0 ? `translateX(${currentStep * 120}px)` : 'translateX(0)',
              animation: currentStep === 0 ? 'mario-walk 2s ease-in-out' : 
                        currentStep > 0 ? 'mario-jump 0.8s ease-in-out' : 'none'
            }}
          >
            {/* Simplified Mario sprite using CSS */}
            <div className="w-16 h-20 relative">
              {/* Hat */}
              <div className="absolute top-0 left-2 w-12 h-4 bg-mario-red rounded-t-lg"></div>
              {/* Face */}
              <div className="absolute top-3 left-1 w-14 h-8 bg-mario-skin rounded-lg"></div>
              {/* Shirt */}
              <div className="absolute top-8 left-0 w-16 h-8 bg-blue-600 rounded"></div>
              {/* Overalls */}
              <div className="absolute top-12 left-2 w-12 h-6 bg-mario-red rounded"></div>
              {/* Legs */}
              <div className="absolute top-16 left-4 w-3 h-4 bg-mario-brown rounded"></div>
              <div className="absolute top-16 left-9 w-3 h-4 bg-mario-brown rounded"></div>
            </div>
          </div>
        )}

        {/* Letter blocks */}
        <div className="flex justify-center items-center space-x-8 relative">
          {letters.map((letter, index) => (
            <div key={index} className="relative">
              {/* Question block */}
              {!brokenBlocks[index] && (
                <div 
                  className={`w-20 h-20 bg-yellow-600 border-4 border-yellow-800 flex items-center justify-center text-2xl font-bold text-white relative
                    ${index === currentStep ? 'animate-pulse' : ''}
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #DAA520 0%, #B8860B 50%, #CD853F 100%)',
                    boxShadow: 'inset 0 0 0 2px #FFD700, 0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <span className="text-yellow-200 font-bold text-3xl">?</span>
                  {/* Letter inside */}
                  <span className="absolute inset-0 flex items-center justify-center text-yellow-100 font-bold text-xl opacity-50">
                    {letter}
                  </span>
                </div>
              )}
              
              {/* Broken block animation */}
              {brokenBlocks[index] && (
                <div className="w-20 h-20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-neon-gold animate-bounce">
                    {letter}
                  </span>
                </div>
              )}
              
              {/* Coin animation */}
              {coins[index] && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-coin-drop">
                  <div className="w-8 h-8 bg-neon-gold rounded-full flex items-center justify-center text-xs font-bold text-yellow-900 gold-glow">
                    $
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-400"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-16 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 right-20 w-20 h-10 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-16 left-1/3 w-12 h-6 bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  );
};

export default MarioAnimation;
