/**
 * Utility for Google Analytics 4 tracking
 */

export const trackEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (path) => {
  trackEvent('page_view', { page_path: path });
};

export const trackChatMessage = (userId, query, category) => {
  trackEvent('ai_chat_query', {
    user_id: userId,
    query_category: category,
    timestamp: new Date().toISOString()
  });
};

export const trackQuizResult = (userId, score, total) => {
  trackEvent('quiz_completed', {
    user_id: userId,
    quiz_score: score,
    quiz_total: total
  });
};
