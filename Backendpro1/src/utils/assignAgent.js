import Agent from "../models/Agent.js";

export const assignAgent = async (location) => {
  // First try to find agents covering the location
  let agents = await Agent.find({ serviceAreas: location })
    .sort({ performanceScore: -1, currentLoad: 1 })
    .limit(1);

  // If no agent covers the location, assign any available agent
  if (agents.length === 0) {
    agents = await Agent.find({})
      .sort({ performanceScore: -1, currentLoad: 1 })
      .limit(1);
  }

  return agents[0] || null;
};