import { Message } from '../types';

const COMMON_RESPONSES = {
  greeting: [
    "Hello! I'm your AI disaster assistance bot. How can I help you today?",
    "Hi there! I'm here to help with emergency preparedness and response. What do you need?",
    "Welcome! I can assist you with disaster-related information and guidance. What would you like to know?"
  ],

  hurricane: `Here's what you should do to prepare for a hurricane:

1. Create an emergency plan and share with family
2. Build an emergency kit with:
   - Water (1 gallon per person per day for 3 days)
   - Non-perishable food
   - Flashlights and batteries
   - First aid supplies
   - Important documents
3. Know your evacuation routes and local shelters
4. Secure your home:
   - Board up windows
   - Bring outdoor furniture inside
   - Clear gutters and drains
5. Stay informed through NOAA Weather Radio
6. Keep your car fueled and ready
7. Have cash on hand
8. Charge all devices and have backup power banks`,

  flood: `During a flood, follow these critical steps:

1. Move to higher ground IMMEDIATELY if advised
2. Never walk or drive through flood waters
   - 6 inches of water can knock you down
   - 12 inches can float most vehicles
3. Stay off bridges over fast-moving water
4. If trapped in a building by flood waters:
   - Go to the highest level
   - Only go to the roof if necessary
   - Signal for help
5. Monitor emergency channels
6. Follow evacuation orders promptly
7. Turn off utilities if instructed
8. Document damage for insurance`,

  earthquake: `If an earthquake occurs:

1. DROP to the ground
2. COVER by getting under a sturdy desk/table
3. HOLD ON until the shaking stops

After the main shock:
- Expect aftershocks
- Check for injuries and provide first aid
- Look for and extinguish small fires
- Listen to radio for instructions
- Stay out of damaged buildings
- Text instead of calling to keep lines clear`,

  emergencyKit: `Essential items for your emergency kit:

1. Water: 1 gallon per person per day (3-day supply)
2. Food: 3-day supply of non-perishable items
3. Battery-powered radio and extra batteries
4. Flashlight and extra batteries
5. First aid kit
6. Medications (7-day supply)
7. Multi-tool or basic tools
8. Personal hygiene items
9. Copies of important documents
10. Cell phone chargers
11. Emergency blankets
12. Cash and change
13. Maps of the area

Check and update your kit every 6 months!`,

  shelter: `To find emergency shelters:

1. Use our Resources page to locate nearby shelters
2. Call 211 for local shelter information
3. Contact Red Cross: 1-800-RED-CROSS
4. Check local government websites
5. Monitor local news and social media
6. Use FEMA's shelter locator app

Remember:
- Bring essential supplies
- Follow all shelter rules
- Register with shelter staff
- Keep important documents with you`,

  fallback: `I'm here to help with disaster-related questions. I can provide information about:

1. Emergency preparedness
2. Disaster response procedures
3. Finding shelters and resources
4. Creating emergency plans
5. Building emergency kits
6. Evacuation guidelines
7. Post-disaster recovery

Please let me know what specific information you need.`
};

const findBestResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  // Check for greetings
  if (q.match(/^(hi|hello|hey|greetings|howdy)/)) {
    return COMMON_RESPONSES.greeting[Math.floor(Math.random() * COMMON_RESPONSES.greeting.length)];
  }

  // Check for specific disaster types
  if (q.includes('hurricane')) {
    return COMMON_RESPONSES.hurricane;
  }
  
  if (q.includes('flood')) {
    return COMMON_RESPONSES.flood;
  }
  
  if (q.includes('earthquake')) {
    return COMMON_RESPONSES.earthquake;
  }

  // Check for emergency kit related questions
  if (q.includes('kit') || q.includes('supplies') || q.includes('prepare')) {
    return COMMON_RESPONSES.emergencyKit;
  }

  // Check for shelter related questions
  if (q.includes('shelter') || q.includes('evacuat')) {
    return COMMON_RESPONSES.shelter;
  }

  // Fallback response
  return COMMON_RESPONSES.fallback;
};

export const processChatQuery = async (query: string): Promise<string> => {
  // Simulate API processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    return findBestResponse(query);
  } catch (error) {
    console.error('Error processing chat query:', error);
    return "I apologize, but I'm having trouble processing your request. Please try again or rephrase your question.";
  }
};