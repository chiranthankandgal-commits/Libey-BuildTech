
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import { AppTab } from './types';
import { SERVICES, PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return (
          <>
            {/* Hero Section */}
            <section className="relative bg-slate-950 pt-32 pb-24 overflow-hidden border-b border-white/5">
              {/* Background Visuals - Matching the Logo Aesthetic */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#1e3a8a_0%,transparent_50%)] opacity-20"></div>
                {/* Blueprint Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl">
                  <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-400/20 text-xs font-bold rounded-full mb-8 uppercase tracking-widest animate-pulse">
                    Eliminating Construction Surprises
                  </span>
                  <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter">
                    Construction is full <br/>
                    of surprises. <br/>
                    <span className="text-slate-500">Your budget shouldn't be.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                    Libey BuildTech provides cost certainty and quantity accuracy through digital planning models, protecting developers before ground-breaking.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <button 
                      onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                      className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 hover:-translate-y-1 active:translate-y-0"
                    >
                      Schedule a Discovery Call
                    </button>
                    <button 
                      onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                      className="text-white font-bold text-lg hover:text-blue-400 transition-colors border-b-2 border-white/10 hover:border-blue-400 pb-1"
                    >
                      Talk to an Expert →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-5">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                      A partner in your project's financial integrity.
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      Libey BuildTech is a BIM-led consultancy focused on <strong>decision support and risk mitigation.</strong>
                    </p>
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-600">
                      <p className="text-slate-800 font-medium italic mb-2">
                        "Led by a specialist in BIM automation and planning for US-based real estate workflows, we bring a data-driven approach to construction cost control."
                      </p>
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">— Libey BuildTech Specialist Leadership</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-shield-halved text-xl text-blue-400"></i>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Cost Certainty</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Predictable budgets derived from high-fidelity digital validation, not manual estimates.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-chart-line text-xl text-blue-400"></i>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Quantity Accuracy</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Exact material counts linked directly to the planning model to eliminate waste and errors.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-shuffle text-xl text-blue-400"></i>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Controlled Changes</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Visualize the financial impact of design modifications instantly before they reach the site.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-brain text-xl text-blue-400"></i>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Better Decisions</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Make choices with confidence, backed by data derived from specialized digital workflows.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case AppTab.SERVICES:
        return (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Consultancy Services</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Focused exclusively on planning, cost-control, and decision-support.</p>
              </div>
              <div className="space-y-16">
                {SERVICES.map((s, idx) => (
                  <div key={s.id} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 p-8 lg:p-12 rounded-3xl bg-slate-50 border border-slate-100`}>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-6 text-slate-900">{s.title}</h3>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">{s.description}</p>
                      <ul className="space-y-4 mb-10">
                        {s.features.map((f, i) => (
                          <li key={i} className="flex items-center text-slate-700">
                            <i className="fa-solid fa-check text-blue-500 mr-3"></i> {f}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm inline-block">
                        <span className="text-blue-600 font-bold uppercase text-xs tracking-widest block mb-2">Outcome</span>
                        <p className="text-slate-900 font-semibold">{s.outcome}</p>
                      </div>
                    </div>
                    <div className="flex-1 w-full h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-inner">
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 duration-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case AppTab.HOW_IT_WORKS:
        return (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-slate-900">A Simple Path to Clarity</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
                {[
                  { step: "01", title: "Review Materials", desc: "We analyze your CAD drawings, PDF sets, or preliminary Revit models to identify potential risks." },
                  { step: "02", title: "Model Upgrade", desc: "We build or refine a 'Planning Model' specifically designed as a data container for cost validation." },
                  { step: "03", title: "Extract Data", desc: "Using internal automation, we pull exact material quantities and link them to budget targets." },
                  { step: "04", title: "Informed Decision", desc: "You receive the clarity needed to make final project decisions before construction starts." }
                ].map((item, i) => (
                  <div key={i} className="relative p-8 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-4xl font-black text-slate-200 block mb-6">{item.step}</span>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                className="mt-20 px-10 py-5 bg-slate-800 text-white rounded-xl text-xl font-bold hover:bg-slate-700 transition-all shadow-xl"
              >
                Schedule Step 1
              </button>
            </div>
          </section>
        );

      case AppTab.CASE_EXAMPLE:
        return (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900 text-white p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6 block">Case Example: Residential Development</span>
                  <h2 className="text-4xl font-extrabold mb-10">Avoiding a $1.2M Quantity Surprise</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-blue-400 font-bold mb-2">Situation</h4>
                      <p className="text-slate-300 leading-relaxed">A developer suspected their concrete estimates were overly optimistic based on manual takeoff methods.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-bold mb-2">Our Support</h4>
                      <p className="text-slate-300 leading-relaxed">We built a digital planning model that revealed a 15% discrepancy in slab volume across three floors.</p>
                    </div>
                  </div>
                  <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-slate-200 italic leading-relaxed">"The developer was able to renegotiate the contract and adjust financing <strong>before</strong> signing the main construction agreement, avoiding a massive late-stage change order."</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]"></div>
              </div>
            </div>
          </section>
        );

      case AppTab.PRODUCTS:
        return (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Professional Tools</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Supporting teams who manage BIM operations internally with our validated utilities.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{p.category}</span>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">{p.name}</h3>
                    <p className="text-slate-600 text-sm mb-8 flex-grow">{p.description}</p>
                    <button className="w-full py-3 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                      {p.category === 'Templates' ? 'Download Template' : 'Buy Tool'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-20 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <p className="text-blue-900 font-medium max-w-2xl mx-auto">
                  “Our core work is consultancy-led planning and cost control. These tools are secondary resources designed to support teams that already manage BIM internally.”
                </p>
              </div>
            </div>
          </section>
        );

      case AppTab.PRICING:
        return (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Value-Based Approach</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">We price based on the risk we remove and the decisions we empower, not just hours worked.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 bg-slate-50 rounded-3xl border border-slate-200">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Fixed Project Fee</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">Best for specific developments requiring early cost clarity and digital validation before a contract is signed.</p>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Clearly defined planning model</li>
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Targeted quantity validation</li>
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Transparent cost reporting</li>
                  </ul>
                </div>
                <div className="p-10 bg-slate-800 text-white rounded-3xl shadow-2xl scale-105 border border-blue-500/20">
                  <h3 className="text-2xl font-bold mb-4">Monthly Retainer</h3>
                  <p className="text-slate-300 leading-relaxed mb-8">Ideal for architects and developers with a steady pipeline needing constant cost-impact oversight and decision support.</p>
                  <ul className="space-y-4 text-sm text-slate-400">
                    <li><i className="fa-solid fa-check text-blue-400 mr-2"></i> Priority consultant access</li>
                    <li><i className="fa-solid fa-check text-blue-400 mr-2"></i> Ongoing quantity checks</li>
                    <li><i className="fa-solid fa-check text-blue-400 mr-2"></i> Strategic workflow alignment</li>
                  </ul>
                </div>
                <div className="p-10 bg-slate-50 rounded-3xl border border-slate-200">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Planning Fees</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">Tailored for early-stage feasibility where digital models are used to explore cost-effective design trade-offs.</p>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Design impact visualization</li>
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Early risk assessment</li>
                    <li><i className="fa-solid fa-check text-blue-500 mr-2"></i> Feasibility cost clarity</li>
                  </ul>
                </div>
              </div>
              <div className="mt-20 text-center">
                <button onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)} className="px-10 py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg">
                  Request a Custom Quote
                </button>
              </div>
            </div>
          </section>
        );

      case AppTab.TALK_TO_EXPERT:
        return (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h1 className="text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Eliminate construction risk today.</h1>
                  <p className="text-xl text-slate-600 mb-12">
                    Schedule a 15-minute Discovery Call to discuss your current project scope and cost-control goals. No obligation, just clarity.
                  </p>
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 mb-12">
                    <h5 className="font-bold mb-4 text-slate-900 text-lg">Leadership Note</h5>
                    <p className="text-slate-600 italic leading-relaxed">
                      "Libey BuildTech is led by a specialist with extensive experience in BIM planning for US-based real estate workflows. We bridge the gap between technical data and business decision-making."
                    </p>
                  </div>
                </div>
                <div className="bg-white p-10 lg:p-12 rounded-3xl shadow-2xl border border-slate-100 text-center">
  <h3 className="text-2xl font-bold mb-4 text-slate-900">
    Schedule Your Call
  </h3>

  <p className="text-slate-600 mb-8">
    Book a 15-minute discovery call to discuss your project scope and cost-control goals.
  </p>

  <a
    href="https://forms.gle/MwEweWvufusbdFLX8"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block w-full px-10 py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-500 transition-all shadow-lg"
  >
    Schedule a Discovery Call
  </a>

  <p className="mt-6 text-center text-xs text-slate-400">
    Assurance of no obligation. Data handled securely.
  </p>
</div>


  <p className="text-center text-xs text-slate-400">
    Assurance of no obligation. Data handled securely.
  </p>
</form>

                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
      <ChatWidget />
    </Layout>
  );
};

export default App;
