import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import { AppTab } from './types';
import { SERVICES, PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (activeTab) {

      /* ================= HOME ================= */
      case AppTab.HOME:
        return (
          <section className="relative bg-slate-950 pt-32 pb-24 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-400/20 text-xs font-bold rounded-full mb-8 uppercase tracking-widest">
                Eliminating Construction Surprises
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-10">
                Construction is full of surprises.<br />
                <span className="text-slate-500">Your budget shouldn’t be.</span>
              </h1>

              <p className="text-xl text-slate-400 max-w-2xl mb-12">
                Libey BuildTech provides cost certainty and quantity accuracy
                through BIM-led planning models.
              </p>

              <button
                onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                className="px-10 py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-500"
              >
                Schedule a Discovery Call
              </button>
            </div>
          </section>
        );

      /* ================= SERVICES ================= */
      case AppTab.SERVICES:
        return (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 space-y-20">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                  Consultancy Services
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Focused exclusively on planning, cost control, and decision support.
                </p>
              </div>

              {SERVICES.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex flex-col ${
                    i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } gap-16 items-center bg-slate-50 p-10 rounded-3xl`}
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6">{s.title}</h3>
                    <p className="text-lg text-slate-600 mb-8">{s.description}</p>

                    <ul className="space-y-3 mb-8">
                      {s.features.map((f, idx) => (
                        <li key={idx} className="flex items-center text-slate-700">
                          <i className="fa-solid fa-check text-blue-500 mr-3" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="bg-white p-6 rounded-xl border">
                      <span className="text-blue-600 font-bold uppercase text-xs">
                        Outcome
                      </span>
                      <p className="mt-2 font-semibold">{s.outcome}</p>
                    </div>
                  </div>

                  <div className="flex-1 h-96 bg-slate-200 rounded-2xl overflow-hidden">
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      /* ================= PROCESS ================= */
      case AppTab.HOW_IT_WORKS:
        return (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-16">
                A Simple Path to Clarity
              </h1>

              <div className="grid md:grid-cols-4 gap-10 text-left">
                {[
                  ['01', 'Review Materials', 'Analyze drawings and models'],
                  ['02', 'Planning Model', 'Build cost-validation BIM model'],
                  ['03', 'Extract Data', 'Accurate BOQs and quantities'],
                  ['04', 'Decide', 'Commit with confidence'],
                ].map(([step, title, desc]) => (
                  <div key={step} className="p-8 bg-slate-50 rounded-2xl">
                    <span className="text-4xl font-black text-slate-200">{step}</span>
                    <h3 className="text-xl font-bold mt-4">{title}</h3>
                    <p className="text-slate-600 mt-2">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      /* ================= CASE EXAMPLE ================= */
      case AppTab.CASE_EXAMPLE:
        return (
          <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
              <div className="bg-slate-900 text-white p-14 rounded-3xl">
                <span className="text-blue-400 uppercase font-bold text-sm">
                  Case Example
                </span>

                <h2 className="text-4xl font-extrabold mt-6 mb-10">
                  Avoiding a $1.3M Quantity Surprise
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-blue-400 font-bold mb-2">Situation</h4>
                    <p className="text-slate-300">
                      Manual estimates underestimated slab quantities.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-blue-400 font-bold mb-2">Our Support</h4>
                    <p className="text-slate-300">
                      BIM planning model revealed a 15% discrepancy early.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      /* ================= TOOLS ================= */
      case AppTab.PRODUCTS:
        return (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h1 className="text-4xl font-extrabold text-center mb-12">
                Professional Tools
              </h1>

              <div className="grid md:grid-cols-4 gap-8">
                {PRODUCTS.map(p => (
                  <div
                    key={p.id}
                    className="p-8 bg-white rounded-2xl border flex flex-col"
                  >
                    <span className="text-xs text-blue-600 font-bold uppercase mb-3">
                      {p.category}
                    </span>
                    <h3 className="text-xl font-bold mb-4">{p.name}</h3>
                    <p className="text-slate-600 mb-8 flex-grow">{p.description}</p>

                    <button
                      onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                      className="py-3 bg-blue-600 text-white rounded-lg font-bold"
                    >
                      Schedule Discovery Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      /* ================= TALK TO EXPERT ================= */
      case AppTab.TALK_TO_EXPERT:
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl font-extrabold mb-8 text-slate-900">
            Eliminate construction risk today.
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Schedule a 15-minute discovery call to discuss scope, costs, and
            early-stage risk mitigation. No obligation — just clarity.
          </p>

          <ul className="space-y-4 text-slate-700 text-lg">
            <li>• BIM-based cost & quantity validation</li>
            <li>• Early-stage feasibility & BOQs</li>
            <li>• Planning support before construction</li>
          </ul>
        </div>

        {/* RIGHT CTA CARD */}
        <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-slate-900">
            Schedule Your Discovery Call
          </h3>

          <p className="text-slate-600 mb-10">
            Click below to fill a short form. We’ll personally reach out to you.
          </p>

          <button
            onClick={() =>
              window.open(
                'https://forms.gle/MwEweWvufusbdFLX8',
                '_blank'
              )
            }
            className="w-full py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-all"
          >
            Open Scheduling Form
          </button>

          <p className="text-xs text-slate-400 mt-6">
            Typically responds within 24 hours
          </p>
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
      {renderContent()}
      <ChatWidget />
    </Layout>
  );
};

export default App;
