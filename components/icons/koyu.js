const Koyu = ({ size = 18, color = 'var(--fg)' }) => {
  return (
    <svg width={size} viewBox="0 0 18 9" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.404494C0 0.181089 0.180916 0 0.404494 0H17.5955C17.8191 0 18 0.181089 18 0.404494V7.88764C18 8.11105 17.8191 8.29214 17.5955 8.29214H0.404494C0.180916 8.29214 0 8.11105 0 7.88764V0.404494ZM1.61798 1.21348C1.56584 1.21348 1.51843 1.23323 1.48288 1.26567C1.4418 1.30268 1.41573 1.35621 1.41573 1.41573V6.8764C1.41573 6.98809 1.50658 7.07865 1.61798 7.07865H4.85314H13.1461V6.32743C13.1461 6.21574 13.2361 6.12519 13.3483 6.12519H14.1281C14.2403 6.12519 14.3303 6.21574 14.3303 6.32743V7.07865H16.382C16.4934 7.07865 16.5843 6.98809 16.5843 6.8764V1.41573C16.5843 1.34268 16.5456 1.27866 16.4879 1.24311C16.4571 1.22432 16.4207 1.21348 16.382 1.21348H1.61798Z"
        fill={color}
      />
    </svg>
  )
}

export default Koyu
