export const CONTACT_EMAIL = 'isaac@novarey.us';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/isaacareyes/';

const calendarParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'NovaRey Strategy Call',
    details: [
        'Strategy call with Isaac Reyes / NovaRey Ventures.',
        '',
        'Topics: website, brand system, AI integration, automation, or custom digital build.',
        '',
        'Please choose a time that works and add any project context before sending the invite.',
    ].join('\n'),
    location: 'Google Meet / video call',
    add: CONTACT_EMAIL,
});

export const STRATEGY_CALL_URL = `https://calendar.google.com/calendar/render?${calendarParams.toString()}`;

export const makeMailto = ({ subject = 'NovaRey project inquiry', body = '' } = {}) => {
    const params = new URLSearchParams({
        subject,
        body,
    });

    return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
};

export const GENERAL_EMAIL_URL = makeMailto({
    subject: 'NovaRey project inquiry',
    body: [
        'Hi Isaac,',
        '',
        'I would like to talk about a project with NovaRey Ventures.',
        '',
        'Project type:',
        'Timeline:',
        'Budget range:',
        'Current website or links:',
        '',
        'Notes:',
    ].join('\n'),
});
