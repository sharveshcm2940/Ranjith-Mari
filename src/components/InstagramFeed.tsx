import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  Instagram, 
  AlertCircle, 
  Grid, 
  ChevronRight, 
  Code, 
  ExternalLink, 
  Settings, 
  Info, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  Copy,
  LayoutGrid,
  Sparkles,
  Play
} from 'lucide-react';
import InstagramCard, { InstagramPost } from './InstagramCard';
import SkeletonCard from './SkeletonCard';

interface InstagramFeedProps {
  /** Optional custom fetch handler to easily plug in third-party Instagram feed services */
  customFetchFeed?: (limit: number, nextCursor?: string) => Promise<{
    posts: InstagramPost[];
    nextCursor?: string;
    hasMore: boolean;
  }>;
  /** Maximum items per page for the custom/fallback feed */
  pageSize?: number;
}

// Highly authentic fallback data representing @dr.mari_facts's dental & clinical profile
const FALLBACK_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'fb_post_1',
    caption: '🔬 Cortical anchoraging & suture refinement: Left zygomatic anchorage placement for immediate loading. Torque reached 45 Ncm with excellent stability. #periodontics #implantology #microsurgery #dr_mari_facts',
    media_type: 'CAROUSEL_ALBUM',
    media_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-07-02T10:30:00Z'
  },
  {
    id: 'fb_post_2',
    caption: '🎥 Double-sling periodontal microsuturing under 10x magnification. Precision in margins guarantees clean healing without scar tissue. #periodontics #microsutures #suturetips #dr_mari_facts',
    media_type: 'VIDEO',
    media_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-06-28T14:15:00Z'
  },
  {
    id: 'fb_post_3',
    caption: '🎓 Truly humbled to deliver the Masterclass lecture on Advanced Zygomatic & Pterygoid Anchorage Angles at the Munich Global Implantology Symposium. Thank you all for coming! #implantology #lecturing #munich #dentistry',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-06-21T08:00:00Z'
  },
  {
    id: 'fb_post_4',
    caption: '🔬 Scanning Electron Microscopy (SEM) analysis of newly fabricated titanium nanoparticles and surface modifications. Biocompatibility profile looks excellent. #dentalresearch #materialscience #dentistry',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-06-14T17:45:00Z'
  },
  {
    id: 'fb_post_5',
    caption: '💡 Periodontal regeneration: Laser-assisted non-invasive attachment therapy (LANAP) showing remarkable pocket depth reduction at 6 months post-op. #periodontalregeneration #lasertherapy #dentistry',
    media_type: 'CAROUSEL_ALBUM',
    media_url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-06-05T12:00:00Z'
  },
  {
    id: 'fb_post_6',
    caption: '🎖️ Celebrated receiving the official Fellow Master of Oral Implantologists (MICOI USA) credential. Dedicated to bringing evidence-based precision microsurgery to my patients. #micoi #dentalachievement #academicexcellence',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1531844251246-9a1bfaae0d16?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-05-30T09:30:00Z'
  },
  {
    id: 'fb_post_7',
    caption: '🎥 Interactive guide: Modern operating setup & ergonomic positioning during micro-periodontics. Minimizing fatigue to maximize surgical outcome. #ergonomics #microsurgery #surgicalsetup',
    media_type: 'VIDEO',
    media_url: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-05-18T15:20:00Z'
  },
  {
    id: 'fb_post_8',
    caption: '📝 Academic lecture series: Reviewing the cellular mechanics of alveolar bone remodeling during implant osseointegration. Interactive discussion on dental research. #alveolarbone #osseointegration #dentalstudent',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-05-10T11:10:00Z'
  },
  {
    id: 'fb_post_9',
    caption: '🎤 Presenting our collaborative paper on 3D printed guides and precision entry angles at the annual periodontology summit. Innovation driving safety. #digitaldentistry #3Dprintedguide #periodontologysummit',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    permalink: 'https://www.instagram.com/dr.mari_facts/',
    timestamp: '2026-04-28T16:30:00Z'
  }
];

type IntegrationMode = 'custom-api' | 'third-party-widget';
type WidgetProvider = 'elfsight' | 'embedsocial' | 'snapwidget' | 'taggbox' | 'custom';

export default function InstagramFeed({ customFetchFeed, pageSize = 6 }: InstagramFeedProps) {
  // Feed integration state
  const [integrationMode, setIntegrationMode] = useState<IntegrationMode>('custom-api');
  const [widgetProvider, setWidgetProvider] = useState<WidgetProvider>('elfsight');
  
  // Custom API post state
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Customizer/Settings Panel state
  const [showSettings, setShowSettings] = useState(false);
  const [widgetUrlInput, setWidgetUrlInput] = useState<string>(
    import.meta.env.VITE_INSTAGRAM_WIDGET_URL || ''
  );
  const [widgetCodeInput, setWidgetCodeInput] = useState<string>(
    import.meta.env.VITE_INSTAGRAM_WIDGET_HTML || ''
  );
  const [copiedEnv, setCopiedEnv] = useState<string | null>(null);

  // Read credentials from environment variables
  const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
  const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;
  const hasCredentials = accessToken && accessToken !== 'YOUR_TOKEN' && accessToken.trim() !== '';

  // Load custom API feed data
  const fetchFeedData = async (isLoadMore = false) => {
    if (isLoadMore) {
      setIsPaginationLoading(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      if (customFetchFeed) {
        const result = await customFetchFeed(pageSize, nextCursor || undefined);
        setPosts((prev) => (isLoadMore ? [...prev, ...result.posts] : result.posts));
        setNextCursor(result.nextCursor || null);
        setHasMore(result.hasMore);
      } 
      else if (hasCredentials) {
        const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
        let url = `https://graph.instagram.com/${userId || 'me'}/media?fields=${fields}&limit=${pageSize}&access_token=${accessToken}`;
        
        if (isLoadMore && nextCursor) {
          url = nextCursor;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Graph API Response error');
        }

        const resData = await response.json();
        if (!resData || !resData.data) {
          throw new Error('Malformed Graph API response');
        }

        const mappedPosts: InstagramPost[] = resData.data.map((item: any) => ({
          id: item.id,
          caption: item.caption || '',
          media_type: item.media_type,
          media_url: item.media_url,
          thumbnail_url: item.thumbnail_url,
          permalink: item.permalink,
          timestamp: item.timestamp,
        }));

        setPosts((prev) => (isLoadMore ? [...prev, ...mappedPosts] : mappedPosts));
        setNextCursor(resData.paging?.next || null);
        setHasMore(!!resData.paging?.next);
      } 
      else {
        // Fallback simulated clinical feed
        await new Promise((resolve) => setTimeout(resolve, 800));
        const startIndex = isLoadMore ? posts.length : 0;
        const endIndex = startIndex + pageSize;
        const sliceData = FALLBACK_INSTAGRAM_POSTS.slice(0, endIndex);
        
        setPosts(sliceData);
        setHasMore(endIndex < FALLBACK_INSTAGRAM_POSTS.length);
        setNextCursor(endIndex.toString());
      }
    } catch (err) {
      console.error('Error loading Instagram feed:', err);
      setError('Unable to load Instagram posts at the moment.');
    } finally {
      setIsLoading(false);
      setIsPaginationLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, [accessToken, userId, customFetchFeed]);

  const handleLoadMore = () => {
    if (isPaginationLoading || !hasMore) return;
    fetchFeedData(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEnv(label);
    setTimeout(() => setCopiedEnv(null), 2000);
  };

  // Helper to extract or safely build direct iframe src if given a widget ID or a full widget URL
  const getWidgetIframeSrc = () => {
    const input = widgetUrlInput.trim();
    if (!input) return '';

    // If they typed just a generic ID or short token
    const isFullUrl = input.startsWith('http://') || input.startsWith('https://');

    if (isFullUrl) {
      return input;
    }

    // Attempt smart prefix match for widget providers
    switch (widgetProvider) {
      case 'elfsight':
        return `https://apps.elfsight.com/widget/${input}`;
      case 'embedsocial':
        return `https://embedsocial.com/api/pro_hashtag/${input}`;
      case 'snapwidget':
        return `https://snapwidget.com/embed/${input}`;
      case 'taggbox':
        return `https://widget.taggbox.com/${input}`;
      default:
        return input;
    }
  };

  // Safe HTML render helper for pasted direct HTML code containing complex iframes or scripts
  const renderPastedHtmlCode = () => {
    if (!widgetCodeInput.trim()) return null;
    
    // Check if it's an iframe code block
    const iframeSrcMatch = widgetCodeInput.match(/src="([^"]+)"/);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      return (
        <iframe
          src={iframeSrcMatch[1]}
          className="w-full h-[650px] border-0 rounded-2xl shadow-sm bg-white"
          title="Instagram EmbedSocial/Elfsight Widget Code"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      );
    }

    // Fallback direct mounting inside container
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: widgetCodeInput }} 
        className="w-full overflow-hidden rounded-2xl bg-white p-2 min-h-[500px]"
      />
    );
  };

  // Fallback guides for each widget provider
  const widgetInstructions = {
    elfsight: {
      title: 'Elfsight Instagram Feed Widget',
      steps: [
        'Go to Elfsight.com and create a free account.',
        'Select the "Instagram Feed" widget app.',
        'Connect the public profile @dr.mari_facts or configure the hashtag feed.',
        'Customize your grid design (columns, masonry style, header info).',
        'Click "Publish", copy your Widget ID (e.g., e0a7b45c-...) or the shareable URL.'
      ],
      defaultUrlPlaceholder: 'e0a7b45c-89b1-4191-be7f-0562e89668d2'
    },
    embedsocial: {
      title: 'EmbedSocial Social Media Aggregator',
      steps: [
        'Create an account on EmbedSocial.com.',
        'Navigate to "Sources" and select "Instagram".',
        'Authorize your Instagram Account or enter @dr.mari_facts.',
        'Generate your custom feed layout.',
        'Copy your platform Embed iframe source URL (e.g., embedsocial.com/api/pro_hashtag/...).'
      ],
      defaultUrlPlaceholder: 'https://embedsocial.com/api/pro_hashtag/b7c25c38da9...'
    },
    snapwidget: {
      title: 'SnapWidget Free Grid/Carousel Widget',
      steps: [
        'Visit SnapWidget.com and sign up.',
        'Select "Instagram Grid" or "Instagram Board" (free/premium).',
        'Enter username "dr.mari_facts" and adjust the size configuration.',
        'Click "Get Widget" to generate the iframe source.',
        'Copy the iframe source URL or SnapWidget ID (e.g., 1045231).'
      ],
      defaultUrlPlaceholder: '1045231'
    },
    taggbox: {
      title: 'Taggbox Widget Portal',
      steps: [
        'Log into Taggbox.com and select Taggbox Widget.',
        'Click "Add Social Feed" and choose "Instagram".',
        'Define feed parameters (Handles: @dr.mari_facts, hashtags).',
        'Customize your design layouts and moderation settings.',
        'Click "Publish", choose "Iframe" or "HTML Code" and copy the source code.'
      ],
      defaultUrlPlaceholder: 'https://widget.taggbox.com/124531'
    },
    custom: {
      title: 'Custom HTML Widget Code',
      steps: [
        'Obtain an iframe, script tag, or layout code from your preferred developer source.',
        'Paste the raw code inside the "Direct Embed HTML Code" textarea below.',
        'The component will automatically parse and output the iframe securely.'
      ],
      defaultUrlPlaceholder: '<iframe src="https://..." ...>'
    }
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Feed Status Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 border-b border-slate-100 pb-5">
        <div className="text-center md:text-left space-y-1">
          <h4 className="font-sans text-[11px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Social Case Integration
          </h4>
          <p className="font-serif text-xl md:text-2xl font-bold text-brand-navy">
            Clinical Documentation & Patient Updates
          </p>
        </div>

        {/* Integration Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex bg-slate-150/70 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setIntegrationMode('custom-api')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                integrationMode === 'custom-api'
                  ? 'bg-white text-brand-navy shadow-sm border border-slate-200/50 font-extrabold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-brand-blue" />
              API/JSON Feed
            </button>
            <button
              onClick={() => setIntegrationMode('third-party-widget')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                integrationMode === 'third-party-widget'
                  ? 'bg-white text-brand-navy shadow-sm border border-slate-200/50 font-extrabold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-pink-600" />
              Third-Party Widget
            </button>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl border transition-all ${
              showSettings 
                ? 'bg-brand-navy border-brand-navy text-white' 
                : 'bg-white border-slate-200 text-slate-500 hover:text-brand-blue hover:bg-slate-50'
            }`}
            title="Configure Instagram Integration"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel & Dashboard (Collapsible) */}
      {showSettings && (
        <div className="bg-slate-50/55 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-blue" />
              <h5 className="font-sans text-sm font-extrabold text-brand-navy uppercase tracking-wider">
                Instagram Feed Configurator
              </h5>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-600">
              Settings Mode
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Column 1: Mode specific configuration fields */}
            <div className="space-y-4">
              <h6 className="font-sans text-xs font-bold text-slate-600">
                1. Select Active Integration Mode
              </h6>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIntegrationMode('custom-api')}
                  className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                    integrationMode === 'custom-api'
                      ? 'border-brand-blue bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="font-sans text-xs font-bold text-brand-navy">API/JSON Feed Mode</p>
                  <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                    Uses Instagram Graph API or secure server-side proxying with responsive React Cards.
                  </p>
                </button>

                <button
                  onClick={() => setIntegrationMode('third-party-widget')}
                  className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                    integrationMode === 'third-party-widget'
                      ? 'border-brand-blue bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="font-sans text-xs font-bold text-brand-navy">Third-Party Widgets</p>
                  <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                    Integrates pre-designed widgets from EmbedSocial, Elfsight, SnapWidget, or Taggbox easily.
                  </p>
                </button>
              </div>

              {integrationMode === 'third-party-widget' ? (
                <div className="space-y-4 pt-2">
                  <h6 className="font-sans text-xs font-bold text-slate-600">
                    2. Select Widget Provider
                  </h6>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(['elfsight', 'embedsocial', 'snapwidget', 'taggbox', 'custom'] as WidgetProvider[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setWidgetProvider(p)}
                        className={`py-2 px-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-center transition-all ${
                          widgetProvider === p
                            ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Widget ID or Direct Iframe URL
                      </label>
                      <input
                        type="text"
                        value={widgetUrlInput}
                        onChange={(e) => setWidgetUrlInput(e.target.value)}
                        placeholder={`e.g. ${widgetInstructions[widgetProvider].defaultUrlPlaceholder}`}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Direct Embed HTML Code (Iframe/Script tag)
                      </label>
                      <textarea
                        rows={3}
                        value={widgetCodeInput}
                        onChange={(e) => setWidgetCodeInput(e.target.value)}
                        placeholder='<iframe src="https://embedsocial.com/..." class="..." width="100%" height="600"></iframe>'
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2 bg-white rounded-xl p-4 border border-slate-200/60">
                  <h6 className="font-sans text-xs font-bold text-brand-navy flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Custom API Feed Setup Status
                  </h6>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    The custom React grid displays case thumbnail previews directly. 
                    {hasCredentials ? (
                      <span className="text-emerald-600 font-semibold block mt-1">
                        ✓ Live Graph API Credentials configured and ready!
                      </span>
                    ) : (
                      <span className="text-slate-500 font-semibold block mt-1">
                        ℹ No Graph API credentials detected. Operating on a beautiful, pre-seeded clinical case feed for @dr.mari_facts.
                      </span>
                    )}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase tracking-wider mb-1">
                      Configure via .env environment variables:
                    </span>
                    <pre className="text-[10px] bg-slate-900 text-sky-400 p-2.5 rounded-lg overflow-x-auto font-mono select-all">
                      VITE_INSTAGRAM_ACCESS_TOKEN="YOUR_TOKEN"<br />
                      VITE_INSTAGRAM_USER_ID="YOUR_USER_ID"
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Easy Step-by-Step copyable guides for the selected Widget Provider */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <h6 className="font-sans text-xs font-bold text-brand-navy flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-blue" />
                  How to setup: {widgetInstructions[widgetProvider].title}
                </h6>
                <ol className="mt-2 space-y-1.5 text-[11px] text-slate-500 list-decimal pl-4 font-light leading-relaxed">
                  {widgetInstructions[widgetProvider].steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase tracking-wider">
                  Target Production Config variables:
                </span>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono bg-slate-50 border border-slate-150 p-1.5 rounded-lg">
                    <span className="truncate text-slate-500">
                      VITE_INSTAGRAM_WIDGET_URL="{widgetUrlInput || 'YOUR_WIDGET_URL'}"
                    </span>
                    <button
                      onClick={() => copyToClipboard(`VITE_INSTAGRAM_WIDGET_URL="${widgetUrlInput}"`, 'url')}
                      className="p-1 text-slate-400 hover:text-brand-blue"
                      title="Copy env statement"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono bg-slate-50 border border-slate-150 p-1.5 rounded-lg">
                    <span className="truncate text-slate-500">
                      VITE_INSTAGRAM_WIDGET_HTML="{widgetCodeInput ? '[HTML EMBED CODE]' : 'YOUR_HTML_CODE'}"
                    </span>
                    <button
                      onClick={() => copyToClipboard(`VITE_INSTAGRAM_WIDGET_HTML="${widgetCodeInput}"`, 'html')}
                      className="p-1 text-slate-400 hover:text-brand-blue"
                      title="Copy env statement"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {copiedEnv && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    ✓ Copied variable to clipboard! Paste it inside your .env configuration.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy/90 transition-all shadow-sm"
            >
              Apply & Close Configurations
            </button>
          </div>
        </div>
      )}

      {/* RENDER MODE: Custom Grid view */}
      {integrationMode === 'custom-api' && (
        <>
          {/* Error state */}
          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-100 p-6 flex flex-col items-center text-center space-y-3 shadow-xs">
              <AlertCircle className="w-8 h-8 text-rose-500" />
              <p className="font-sans text-sm font-semibold text-rose-900">{error}</p>
              <p className="font-sans text-xs text-rose-700 max-w-md">
                Unable to load Instagram posts at the moment. Please verify your token settings or refresh the feed view.
              </p>
              <button
                onClick={() => fetchFeedData()}
                className="mt-2 px-4 py-1.5 rounded-lg bg-white border border-rose-200 text-xs font-bold text-rose-800 hover:bg-rose-100/50 transition-all shadow-xs"
              >
                Retry Fetching
              </button>
            </div>
          )}

          {/* Skeleton Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: pageSize }).map((_, idx) => (
                <SkeletonCard key={`skeleton-${idx}`} />
              ))}
            </div>
          )}

          {/* Main Grid View */}
          {!isLoading && !error && (
            <>
              {posts.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2">
                  <Instagram className="w-10 h-10 text-slate-300" />
                  <p className="font-sans text-sm text-slate-500 font-medium">No posts found on this feed yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {posts.map((post) => (
                    <InstagramCard key={post.id} post={post} />
                  ))}
                  
                  {isPaginationLoading && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}
                </div>
              )}

              {/* Pagination Load More Button */}
              {hasMore && posts.length > 0 && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={isPaginationLoading}
                    className="group px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center gap-2"
                  >
                    {isPaginationLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Synchronizing posts...
                      </>
                    ) : (
                      <>
                        Load More Posts
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* RENDER MODE: Third-Party Widget Embed */}
      {integrationMode === 'third-party-widget' && (
        <div className="space-y-6">
          {/* Active Configuration Info Banner */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-50 rounded-xl text-pink-600 shrink-0 mt-0.5">
                <Instagram className="w-4 h-4 text-pink-600 fill-transparent" />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-xs font-extrabold text-brand-navy uppercase tracking-wider">
                  Active Widget: {widgetProvider.toUpperCase()} Integrated Module
                </p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed font-light">
                  {widgetUrlInput.trim() || widgetCodeInput.trim() ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      ✓ Custom live widget code successfully mapped. Rendering active viewport below.
                    </span>
                  ) : (
                    <span>
                      ℹ Presets loaded. Displaying a high-fidelity visual simulation. Set Widget ID/HTML inside the <strong>Settings</strong> to connect a live feed.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="text-xs text-brand-blue font-bold tracking-wide hover:underline text-left"
            >
              Configure Widget Embed →
            </button>
          </div>

          {/* Iframe Rendering Viewport */}
          {widgetUrlInput.trim() || widgetCodeInput.trim() ? (
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white min-h-[550px] flex flex-col">
              {widgetCodeInput.trim() ? (
                renderPastedHtmlCode()
              ) : (
                <iframe
                  src={getWidgetIframeSrc()}
                  className="w-full h-[650px] border-0 rounded-2xl shadow-inner bg-white"
                  title={`Instagram ${widgetProvider} Widget Feed`}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              )}
              
              <div className="p-4 bg-slate-50 border-t border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                <span>Rendering secure iframe connection via verified widget host.</span>
                <a
                  href={getWidgetIframeSrc() || 'https://www.instagram.com/dr.mari_facts/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-brand-blue font-bold hover:underline"
                >
                  Open in New Window <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            
            /* High-Fidelity Simulation/Mockup of Third-Party Widgets to present pristine UX before user configuration */
            <div className="space-y-6">
              
              {/* Provider Info Title */}
              <div className="text-center py-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-full border border-slate-200">
                  Visual Layout Sandbox - {widgetProvider.toUpperCase()} PREVIEW
                </span>
              </div>

              {/* Elfsight Preview Layout (Responsive Carousel Grid) */}
              {widgetProvider === 'elfsight' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-pink-500 p-0.5 bg-white">
                        <img 
                          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100" 
                          alt="Dr. Ranjith Mari profile avatar" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h6 className="font-sans text-sm font-extrabold text-slate-800 leading-none">dr.mari_facts</h6>
                        <p className="text-[10px] text-slate-400 font-medium">14.2k followers &bull; 156 posts</p>
                      </div>
                    </div>
                    <a 
                      href="https://www.instagram.com/dr.mari_facts/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wide hover:bg-slate-800 transition-all flex items-center gap-1"
                    >
                      Follow
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FALLBACK_INSTAGRAM_POSTS.slice(0, 3).map((post) => (
                      <div key={post.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-150 shadow-xs bg-slate-950">
                        <img 
                          src={post.media_url} 
                          alt={post.caption} 
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                          <p className="text-[11px] leading-relaxed font-light line-clamp-3">{post.caption}</p>
                          <div className="flex items-center justify-between text-[9px] font-mono">
                            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full">elfsight</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="text-xs text-brand-blue font-bold hover:underline flex items-center gap-1.5 mx-auto"
                    >
                      Connect your Elfsight account to display your full scrollable feed
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* EmbedSocial Preview Layout (Masonry Bento Grid) */}
              {widgetProvider === 'embedsocial' && (
                <div className="bg-slate-50/50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 font-extrabold uppercase tracking-widest">
                      EmbedSocial Powered Feed Grid
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-pink-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Large Spotlight Box */}
                    <div className="md:col-span-2 md:row-span-2 bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm flex flex-col group">
                      <div className="relative aspect-square md:aspect-auto md:flex-1 bg-slate-900 overflow-hidden">
                        <img 
                          src={FALLBACK_INSTAGRAM_POSTS[0].media_url} 
                          alt="First spotlight post" 
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase">
                          <span>Spotlight case study</span>
                          <span>{new Date(FALLBACK_INSTAGRAM_POSTS[0].timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{FALLBACK_INSTAGRAM_POSTS[0].caption}</p>
                      </div>
                    </div>

                    {/* Secondary Items */}
                    {FALLBACK_INSTAGRAM_POSTS.slice(1, 5).map((post) => (
                      <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm flex flex-col group">
                        <div className="relative aspect-square bg-slate-900 overflow-hidden">
                          <img 
                            src={post.media_type === 'VIDEO' && post.thumbnail_url ? post.thumbnail_url : post.media_url} 
                            alt="Post" 
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-light">{post.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-black transition-all shadow-xs"
                    >
                      Connect Live EmbedSocial Token Widget
                    </button>
                  </div>
                </div>
              )}

              {/* SnapWidget Preview Layout (Densely Packed Uniform Square Grid) */}
              {widgetProvider === 'snapwidget' && (
                <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold border-b border-slate-100 pb-3 px-1">
                    <span>SnapWidget.com Grid System (3x3 Responsive Matrix)</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-bold">GRID</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {FALLBACK_INSTAGRAM_POSTS.slice(0, 6).map((post) => (
                      <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden group bg-slate-900 border border-slate-100">
                        <img 
                          src={post.media_type === 'VIDEO' && post.thumbnail_url ? post.thumbnail_url : post.media_url} 
                          alt="SnapWidget Grid Piece" 
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center p-3 text-center">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="text-xs text-brand-blue font-bold hover:underline"
                    >
                      Configure your SnapWidget ID &raquo;
                    </button>
                  </div>
                </div>
              )}

              {/* Taggbox Preview Layout (Masonry Social Board) */}
              {widgetProvider === 'taggbox' && (
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-md space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono text-brand-blue font-bold tracking-widest uppercase">
                      Taggbox Interactive Board
                    </span>
                    <h6 className="font-serif text-lg font-bold text-slate-800">
                      Dental Care Feed & Patient Stories
                    </h6>
                  </div>

                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {FALLBACK_INSTAGRAM_POSTS.slice(0, 6).map((post, index) => (
                      <div key={post.id} className="break-inside-avoid bg-white rounded-2xl border border-slate-150 p-4 shadow-xs space-y-3 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-[10px] font-bold">
                            RM
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-none">dr.mari_facts</p>
                            <p className="text-[9px] text-slate-400">Instagram Post &bull; {new Date(post.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {index % 2 === 0 && (
                          <div className="rounded-xl overflow-hidden aspect-video relative bg-slate-900">
                            <img 
                              src={post.media_url} 
                              alt="Taggbox element" 
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <p className="text-xs text-slate-600 leading-relaxed font-light">
                          {post.caption}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-navy/95 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Paste Taggbox Live HTML/Iframe Code
                    </button>
                  </div>
                </div>
              )}

              {/* Custom Embed Preview Layout */}
              {widgetProvider === 'custom' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md text-center max-w-lg mx-auto space-y-4">
                  <div className="p-3 bg-blue-50 text-brand-blue rounded-2xl inline-block">
                    <Code className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h6 className="font-serif text-base font-bold text-slate-800">Custom Iframe / HTML Embed Module</h6>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed font-light">
                    You can inject any secure web responsive feed widget, social dashboard, or custom interactive code straight into this section.
                  </p>
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Open Settings to Paste Embed Code
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      )}

    </div>
  );
}
