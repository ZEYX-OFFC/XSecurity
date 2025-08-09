import type { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.BOT_TOKEN || '';
let bot: TelegramBot | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  if (!TOKEN) return res.status(500).json({ ok: false, error: 'missing_bot_token' });
  if (!bot) bot = new TelegramBot(TOKEN, { polling: false });
  try {
    await bot.processUpdate(req.body as any);
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'internal_error' });
  }
}
