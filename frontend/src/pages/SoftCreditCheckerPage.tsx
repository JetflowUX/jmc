import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface SoftCreditCheckerPageProps {
  onNavigateToShowroom: () => void;
}

type QuizStep = 'budget' | 'personal' | 'address' | 'results';

export function SoftCreditCheckerPage({ onNavigateToShowroom }: SoftCreditCheckerPageProps) {
  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quiz Form state
  const [quizStep, setQuizStep] = useState<QuizStep>('budget');
  const [carPrice, setCarPrice] = useState('15000');
  const [deposit, setDeposit] = useState('1500');
  const [term, setTerm] = useState('48');
  
  const [personalDetails, setPersonalDetails] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [addressDetails, setAddressDetails] = useState({
    postcode: '',
    addressLine1: '',
    town: '',
    timeAtAddress: '3 years+',
    employment: 'Employed'
  });

  // Simulated results states
  const [eligibilityScore, setEligibilityScore] = useState(85); // Simulated match %
  const [pcpQuote, setPcpQuote] = useState(215);
  const [hpQuote, setHpQuote] = useState(295);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNextStep = (next: QuizStep) => {
    setQuizStep(next);
    if (next === 'results') {
      // Calculate a semi-realistic simulated quote based on input budget
      const priceNum = parseFloat(carPrice) || 15000;
      const depNum = parseFloat(deposit) || 1500;
      const loanAmt = priceNum - depNum;
      
      // HP calculation: (loan * (1 + 0.099 * years)) / months
      const hp = (loanAmt * (1 + 0.099 * 4)) / 48;
      setHpQuote(Math.round(hp));

      // PCP calculation (roughly 70% of HP due to balloon)
      setPcpQuote(Math.round(hp * 0.73));

      // Randomised match score between 75% and 95%
      const match = Math.floor(Math.random() * 21) + 75;
      setEligibilityScore(match);
    }
  };

  const resetQuiz = () => {
    setCarPrice('15000');
    setDeposit('1500');
    setTerm('48');
    setPersonalDetails({
      title: 'Mr',
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phone: ''
    });
    setAddressDetails({
      postcode: '',
      addressLine1: '',
      town: '',
      timeAtAddress: '3 years+',
      employment: 'Employed'
    });
    setQuizStep('budget');
  };

  const faqs = [
    {
      question: 'What is my eligibility score?',
      answer: "Your eligibility score is generated using our free credit checker tool. It checks information held about you from major UK credit reference agencies (like Experian and Equifax). This generates an indication of your eligibility for car finance at this point in time and is not a statement or representation of your creditworthiness in general. We will not pass this information to third parties without your explicit application request."
    },
    {
      question: 'What details do I need to provide for the eligibility checks?',
      answer: "You will need to provide personal information so that the relevant matching can occur. This includes full name, address history, date of birth, contact details, and current employment status. This matches against electoral logs, county court records, and bankruptcy registers to compile a soft profile."
    },
    {
      question: 'How accurate are the eligibility checker results?',
      answer: "The checker gives a highly predictive indication of your eligibility for car finance, including likely cost. Whilst this is very accurate, it is only indicative and does not take into account other information required for a full application, including but not limited to pay slips, bank statements, or specific vehicle underwriting rules."
    }
  ];

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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck size={12} /> Credit Checker
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Finance Eligibility Checker</h1>
          <p className="text-textMuted text-lg">
            Find out if you qualify for vehicle finance before actually applying, with **no impact to your credit score**. Initial checks are 100% soft searches.
          </p>
        </div>

        {/* 3 Step Steps Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Instant Results', desc: 'Makes your decision easier and helps you to find the right deal for your monthly budget.' },
            { title: 'No Credit Score Impact', desc: 'Your eligibility check is not visible to other lenders and will not affect your credit rating.' },
            { title: '100% No-Obligation', desc: 'There is zero cost for checking and you are under no commitment to complete any purchase.' }
          ].map((step, idx) => (
            <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-white font-bold text-base">{step.title}</h3>
                <p className="text-textMuted text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Split: Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Eligibility Quiz Panel */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Check Your Eligibility</h3>
              <p className="text-textMuted text-xs mt-1">Complete our short wizard to check your pre-approved rates.</p>
            </div>

            {/* Quiz Wizard */}
            {quizStep === 'budget' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Target Vehicle Price (£)</label>
                    <input
                      type="number"
                      value={carPrice}
                      onChange={(e) => setCarPrice(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Deposit Available (£)</label>
                    <input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-textMuted font-semibold uppercase">Finance Term Length</label>
                  <select
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="24">24 Months (2 Years)</option>
                    <option value="36">36 Months (3 Years)</option>
                    <option value="48">48 Months (4 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                  </select>
                </div>

                <button
                  onClick={() => handleNextStep('personal')}
                  className="w-full bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Continue to Personal Details
                </button>
              </div>
            )}

            {quizStep === 'personal' && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Title</label>
                    <select
                      value={personalDetails.title}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, title: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={personalDetails.firstName}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={personalDetails.lastName}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={personalDetails.dob}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, dob: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="07800 000000"
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setQuizStep('budget')}
                    className="w-1/3 border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!personalDetails.firstName || !personalDetails.lastName || !personalDetails.dob || !personalDetails.email || !personalDetails.phone) return;
                      handleNextStep('address');
                    }}
                    className="w-2/3 bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {quizStep === 'address' && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Postcode</label>
                    <input
                      type="text"
                      required
                      placeholder="OL10 4RF"
                      value={addressDetails.postcode}
                      onChange={(e) => setAddressDetails({ ...addressDetails, postcode: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white uppercase font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Address Line 1</label>
                    <input
                      type="text"
                      required
                      placeholder="68 Bury New Road"
                      value={addressDetails.addressLine1}
                      onChange={(e) => setAddressDetails({ ...addressDetails, addressLine1: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Town/City</label>
                    <input
                      type="text"
                      required
                      placeholder="Bury"
                      value={addressDetails.town}
                      onChange={(e) => setAddressDetails({ ...addressDetails, town: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Time at Address</label>
                    <select
                      value={addressDetails.timeAtAddress}
                      onChange={(e) => setAddressDetails({ ...addressDetails, timeAtAddress: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="Under 1 Year">Under 1 Year</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 years+">3 Years +</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Employment Status</label>
                    <select
                      value={addressDetails.employment}
                      onChange={(e) => setAddressDetails({ ...addressDetails, employment: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="Employed">Full-Time Employed</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Part-Time">Part-Time Employed</option>
                      <option value="Retired">Retired</option>
                      <option value="Other">Other / Unemployed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setQuizStep('personal')}
                    className="w-1/3 border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!addressDetails.postcode || !addressDetails.addressLine1 || !addressDetails.town) return;
                      handleNextStep('results');
                    }}
                    className="w-2/3 bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Check My Score
                  </button>
                </div>
              </div>
            )}

            {quizStep === 'results' && (
              <div className="space-y-6 text-center animate-fade-in">
                <div className="space-y-2">
                  <span className="text-xs text-green-500 font-bold bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    Eligibility Check Complete
                  </span>
                  <h3 className="text-2xl font-bold text-white">Your Pre-Approval Assessment</h3>
                </div>

                {/* Score Circle Gauge */}
                <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                  {/* Gauge Background */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#18181b"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#dc2626"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="408"
                      strokeDashoffset={408 - (408 * eligibilityScore) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-extrabold text-white">{eligibilityScore}%</span>
                    <span className="block text-[10px] text-textMuted uppercase font-bold tracking-wider mt-1">Approval Rating</span>
                  </div>
                </div>

                <p className="text-textMuted text-xs max-w-md mx-auto leading-relaxed">
                  Excellent! Based on your credit reference metrics, your approval likelihood is <span className="text-white font-bold">High</span>.
                </p>

                {/* Simulated Quotes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
                  <div className="bg-surfaceHighlight/55 border border-white/5 p-5 rounded-2xl space-y-2">
                    <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block">Estimated PCP Payment</span>
                    <div className="text-2xl font-extrabold text-white">£{pcpQuote} <span className="text-xs font-normal text-textMuted">/ mo</span></div>
                    <p className="text-[10px] text-textMuted leading-relaxed">Based on 9.9% Representative APR, 48m, with £{deposit} deposit.</p>
                  </div>
                  <div className="bg-surfaceHighlight/55 border border-white/5 p-5 rounded-2xl space-y-2">
                    <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block">Estimated HP Payment</span>
                    <div className="text-2xl font-extrabold text-white">£{hpQuote} <span className="text-xs font-normal text-textMuted">/ mo</span></div>
                    <p className="text-[10px] text-textMuted leading-relaxed">Own the car outright at the end of the term. No balloon fee.</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={resetQuiz}
                    className="w-1/3 border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all text-xs cursor-pointer"
                  >
                    Check Another Car
                  </button>
                  <button
                    onClick={onNavigateToShowroom}
                    className="w-2/3 bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all text-xs shadow-glow cursor-pointer"
                  >
                    Browse Qualified Vehicles
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sourcing Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            {/* Representative Example Box */}
            <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Representative Example (PCP)</h4>
              <p className="text-[11px] text-textMuted leading-relaxed">
                Cash price £18,495.00, Annual Interest Rate (fixed) 5.14% p.a., with a representative 9.9% APR, total amount of credit £16,646.00, deposit of £1,849.00, followed by 49 monthly payments of £278.75 with a final payment of £8,155.00, total amount payable is £23,384.00, annual mileage 8,000, excess mileage fee 10p per mile.
              </p>
            </div>

            {/* Video Box HP */}
            <div className="glass-panel rounded-3xl p-4 border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs px-2">Understanding Hire Purchase (HP)</h4>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/40">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5ZQgXnmpOuM"
                  title="Understanding HP Car Finance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Video Box PCP */}
            <div className="glass-panel rounded-3xl p-4 border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs px-2">Understanding Personal Contract Purchase (PCP)</h4>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/40">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/MirQqb40fpU"
                  title="Understanding PCP Car Finance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Accordion */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-white/5 pb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left py-3 text-white hover:text-primary transition-colors cursor-pointer"
                  >
                    <h4 className="font-bold text-base md:text-lg">{faq.question}</h4>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <p className="text-textMuted text-sm leading-relaxed mt-2 animate-slide-down">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
