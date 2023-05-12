export default function getDimen(Matrix, dimen) {
	return math.size(Matrix).subset(math.index(dimen));
}