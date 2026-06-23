import React, { useState } from 'react';
import { Star, MessageSquare, ArrowLeft, Send, CheckCircle2, User } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface TestimonialsPageProps {
  onNavigateToShowroom: () => void;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  source: 'AutoTrader' | 'Google' | 'Direct';
  text: string;
  date: string;
}

export function TestimonialsPage({ onNavigateToShowroom }: TestimonialsPageProps) {
  // Pre-compiled list of real reviews from original testimonials.php.html
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Samantha B",
      rating: 5,
      source: "AutoTrader",
      text: "Excellent Service and Honest Advice. I recently bought a new-to-me car from Brian Hill Motors (JMC Motors Ltd) and the whole experience was fantastic. Will went above and beyond. I was torn between two cars, and he gave me independent constructive advice based on my lifestyle and needs, not just what would make a quick sale. Highly recommended!",
      date: "June 2026"
    },
    {
      id: 2,
      author: "G Pugh",
      rating: 5,
      source: "Google",
      text: "Will was really helpful. The purchase went through smoothly and I drove away in my new car in under an hour. Would definitely recommend.",
      date: "May 2026"
    },
    {
      id: 3,
      author: "Vinny M",
      rating: 5,
      source: "AutoTrader",
      text: "Excellent, very informative but with no pressure to buy at all. Very competitive price and also a very good trade in price too. John, Will, Dave and everyone who we came into contact with at the garage were very friendly and helpful. This garage was so good we bought 2 cars!",
      date: "April 2026"
    },
    {
      id: 4,
      author: "Anna C",
      rating: 5,
      source: "Google",
      text: "A truly wonderful service with JMC/Brian Hill Motors. I saw the car I liked on their website and went to see it. Nothing was too much trouble. Will and the team are so knowledgeable and so friendly. The car is in pristine condition. I took it for a test drive and liked it even more. Will was so patient and friendly, answered every question I had. Highly recommend 100%.",
      date: "March 2026"
    },
    {
      id: 5,
      author: "Erin T",
      rating: 5,
      source: "AutoTrader",
      text: "What a lovely car buying experience. From the initial phone call enquiring about the Range Rover Evoque to the handover of the car, Will could not have been any more friendly, helpful and professional. On pick up day, the car was so well presented and looked brand new. BHM's friendly but professional approach is a rarity these days.",
      date: "February 2026"
    },
    {
      id: 6,
      author: "Andrew S",
      rating: 5,
      source: "Google",
      text: "I returned to Brian Hill Motors for my new car, having bought my previous vehicle from them. I found the owner John and his colleague Will to be extremely helpful and knowledgeable. Everything was dealt with with ease and the choice of quality cars was excellent. They sell cars how they should be, without any faff.",
      date: "January 2026"
    },
    {
      id: 7,
      author: "Jemma D",
      rating: 5,
      source: "AutoTrader",
      text: "I have had three cars from Brian Hill motors now. They have all been very good prices, really well looked after, great quality and low mileage. I always feel really comfortable that I'm getting a reliable car. Great service, can't recommend them enough.",
      date: "December 2025"
    },
    {
      id: 8,
      author: "Steven T",
      rating: 5,
      source: "Google",
      text: "The service I received from Will at Brian Hill Motors was excellent, to be honest it's the best car buying experience I've ever had. There was no pressure whatsoever, I was able to look and try cars in my own time and at my own pace.",
      date: "November 2025"
    },
    {
      id: 9,
      author: "Paul B",
      rating: 5,
      source: "AutoTrader",
      text: "Great communication from the first enquiry to the viewing and test drive. The sales executive Will was a great ambassador for the company. The vehicle was extremely well prepared, all queries answered. Smooth transaction. Highly recommended.",
      date: "October 2025"
    },
    {
      id: 10,
      author: "C Horne",
      rating: 5,
      source: "Google",
      text: "Bought my new car from Brian Hill Motors and the service was absolutely amazing. The guys there are so lovely and genuinely helpful. As this was my first car purchase, they talked me through everything and made sure I felt comfortable. Thank you so much!",
      date: "September 2025"
    }
  ]);

  // Filters state
  const [filterSource, setFilterSource] = useState<'All' | 'AutoTrader' | 'Google'>('All');
  
  // Create Review state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const newReview: Review = {
      id: reviews.length + 1,
      author: newAuthor,
      rating: newRating,
      source: 'Direct',
      text: newText,
      date: 'Just Now'
    };

    setReviews([newReview, ...reviews]);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setNewAuthor('');
      setNewRating(5);
      setNewText('');
    }, 3000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterSource === 'All') return true;
    return r.source === filterSource;
  });

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onNavigateToShowroom}
            className="text-textMuted hover:text-white transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Showroom
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Star size={12} fill="currentColor" /> Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Customer Reviews</h1>
          <p className="text-textMuted text-lg font-normal">
            We pride ourselves on our high standards of customer service. Read verified feedback from our AutoTrader and Google reviews.
          </p>
        </div>

        {/* Filters and main review listing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sourcing Form Card (Left/Main section) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex gap-3 border-b border-white/5 pb-4">
              {(['All', 'AutoTrader', 'Google'] as const).map((source) => (
                <button
                  key={source}
                  onClick={() => setFilterSource(source)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    filterSource === source
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-surfaceHighlight/30 text-textMuted hover:text-white border border-white/5'
                  }`}
                >
                  {source} Reviews
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-base flex items-center gap-2">
                        {rev.author}
                      </h4>
                      <span className="text-[10px] text-textMuted font-medium block mt-0.5">{rev.date} via <span className="text-primary font-semibold">{rev.source}</span></span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5 text-yellow-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-textMuted text-sm leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing Side Card (Write a Review Form) */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/5 space-y-5">
            {formSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold text-white">Review Submitted</h4>
                <p className="text-textMuted text-xs max-w-xs mx-auto leading-relaxed">
                  Thank you! Your feedback has been published on our reviews board.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare size={18} className="text-primary" /> Leave Feedback
                  </h3>
                  <p className="text-textMuted text-xs mt-1">Bought a car from JMC? Share your experience with others.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-textMuted font-bold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-textMuted font-bold uppercase tracking-wider block">Your Rating</label>
                    <div className="flex gap-1.5 pt-1 text-textMuted">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`transition-colors cursor-pointer ${star <= newRating ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                        >
                          <Star size={20} fill={star <= newRating ? 'currentColor' : 'none'} stroke="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-textMuted font-bold uppercase tracking-wider">Review Quote</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the customer service, delivery, or purchasing process..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primaryHover text-white py-3 rounded-xl font-bold text-xs transition-all mt-2 shadow-glow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send size={12} /> Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
