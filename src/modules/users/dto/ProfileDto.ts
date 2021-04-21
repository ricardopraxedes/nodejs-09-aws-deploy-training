interface ProfileDTO {
  id?: string;

  email: string;

  photoName: string;

  photoUrl(): string;
}

export { ProfileDTO };
