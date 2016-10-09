export interface CreatedDate {
    $reql_type$: string;
    epoch_time: number;
    timezone: string;
}

export interface TeamMember {
    id: string;
    image: string;
    name: string;
}

export interface TeamTechStack {
    tech: string;
    techImage: string;
}

export interface Team {
    createdDate: CreatedDate;
    id: string;
    teamActive: boolean;
    teamBackgroundImage: string;
    teamDescription: string;
    teamMembers: TeamMember[];
    teamName: string;
    teamProjects: string[];
    teamTechStack: TeamTechStack[];
}

