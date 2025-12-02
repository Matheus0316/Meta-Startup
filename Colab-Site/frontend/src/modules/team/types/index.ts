export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image?: string;
  email?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  position: string;
  description: string;
  image?: string;
  email?: string;
  active?: boolean;
}

export interface UpdateTeamMemberRequest {
  name?: string;
  position?: string;
  description?: string;
  image?: string;
  email?: string;
  active?: boolean;
}

export interface TeamResponse {
  success: boolean;
  count: number;
  team: TeamMember[];
}

export interface TeamMemberResponse {
  success: boolean;
  team: TeamMember;
}

export interface CreateTeamMemberResponse {
  success: boolean;
  message: string;
  team: TeamMember;
}

export interface ToggleActiveResponse {
  success: boolean;
  message: string;
  team: TeamMember;
}

export interface TeamStatistics {
  total: number;
  active: number;
  inactive: number;
}

export interface TeamStatisticsResponse {
  success: boolean;
  statistics: TeamStatistics;
}
