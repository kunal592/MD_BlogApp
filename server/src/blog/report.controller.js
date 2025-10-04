import { prisma } from '../config/database.js';

export const createReport = async (req, res) => {
  try {
    const { contentType, contentId, reason } = req.body;
    if (!contentType || !contentId || !reason)
      return res.status(400).json({ success: false, message: 'Missing required fields' });

    const report = await prisma.report.create({
      data: { contentType, contentId, reason, reporterId: req.user.id },
    });
    res.status(201).json({ success: true, message: 'Reported successfully', data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create report' });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: { reporter: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reports' });
  }
};
