export const CONTACT_EMAIL = 'isaac@novarey.us';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/isaacareyes/';

// Set this to an appointment schedule URL once the studio calendar is connected.
export const STRATEGY_CALL_URL = import.meta.env.VITE_BOOKING_URL || '';

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
