import config from '../config';
import sendgrid from '@sendgrid/mail';

const { SENDGRID_API_KEY } = config;

sendgrid.setApiKey(SENDGRID_API_KEY);

export { sendgrid };
