import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Button from "../ui/Button";
import type { SongFormData } from "../../types/songTypes";
// import { SongFormData } from "../../types/songTypes";

interface SongFormProps {
  onSubmit: (songData: SongFormData) => void;
  initialData?: SongFormData | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

const SongForm: React.FC<SongFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting,
  onCancel,
}) => {
  const [formData, setFormData] = useState<SongFormData>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} css={formStyles}>
      <div css={formGroupStyles}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div css={formGroupStyles}>
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </div>

      <div css={formGroupStyles}>
        <label htmlFor="album">Album</label>
        <input
          type="text"
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
          required
        />
      </div>

      <div css={formGroupStyles}>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select Genre</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="R&B">R&B</option>
          <option value="Country">Country</option>
          <option value="Electronic">Electronic</option>
        </select>
      </div>

      <div css={buttonGroupStyles}>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Song"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const formStyles = css`
  display: grid;
  gap: ${theme.spacing.md};
`;

const formGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-weight: 500;
    color: ${theme.colors.text};
  }

  input,
  select {
    padding: ${theme.spacing.sm};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.md};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
    }
  }
`;

const buttonGroupStyles = css`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

export default SongForm;
