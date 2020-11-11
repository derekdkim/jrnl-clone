const SettingsContent = [
  {
    name: 'Profile',
    to: '/account/profile/',
    active: true
  },
  {
    name: 'Social Connect',
    to: '/account/settings/social-connect/',
    active: false
  },
  {
    name: 'Security',
    to: '/account/settings/security/',
    active: true
  },
  {
    name: 'Reminders',
    to: '/account/setttings/reminders/',
    active: false
  },
  {
    name: 'Email to JRNL',
    to: '/account/settings/email-to-jrnl/',
    active: false
  },
  {
    name: 'Billing',
    to: '/account/settings/billing/',
    active: false
  },
  {
    name: 'Themes',
    to: '/account/settings/themes/',
    active: false
  }
];

const SupportContent = [
  {
    name: 'Knowledge Base',
    href:'helpdesk.jrnl.com/home'
  },
  {
    name: 'Contact Support',
    href:'helpdesk.jrnl.com/new'
  },
  {
    name: 'JRNL Blog',
    href:'blog.jrnl.com'
  }
];

export { SettingsContent, SupportContent };